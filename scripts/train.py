import os
import subprocess

# ... existing imports remain ...
import shutil
import zipfile
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, random_split
from torchvision import models, transforms, datasets
import extract_target_class
import download_expression_neutro

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
DATASET_DIR = os.path.join(PROJECT_ROOT, "dataset")
TEMP_DATASETS_DIR = os.path.join(PROJECT_ROOT, "temp_datasets")

# =====================================================================
# PIPELINE DE DOWNLOAD, ORGANIZAÇÃO, TREINAMENTO E EXPORTAÇÃO ONNX
# =====================================================================

def download_and_extract_datasets():
    """
    Efetua o download dos datasets do Kaggle utilizando a Kaggle API.
    A API lê as credenciais automaticamente de ~/.kaggle/kaggle.json.
    """
    print("==================================================")
    print("1. EFETUANDO DOWNLOAD DOS DATASETS DO KAGGLE...")
    print("==================================================")
    
    # Importação tardia do Kaggle para evitar erros se o pacote ainda estiver carregando
    try:
        from kaggle.api.kaggle_api_extended import KaggleApi
    except ImportError:
        raise ImportError("O pacote 'kaggle' não está instalado. Execute 'pip install kaggle'.")

    api = KaggleApi()
    api.authenticate()

    temp_dir = TEMP_DATASETS_DIR
    os.makedirs(temp_dir, exist_ok=True)

    # Identificadores de datasets no Kaggle
    kaggle_datasets = {
        "dor": "sammay594/pain-detection-face-expressions",
        "ckplus": "shawon10/ckplus",
        "drowsiness": "nexuswho/drowsiness-detection"
    }

    for key, dataset_id in kaggle_datasets.items():
        dest_path = os.path.join(temp_dir, key)
        if os.path.exists(dest_path) and len(os.listdir(dest_path)) > 0:
            print(f"Dataset '{key}' já existe localmente em {dest_path}. Pulando download.")
            continue
            
        print(f"Baixando {dataset_id}...")
        os.makedirs(dest_path, exist_ok=True)
        # Baixa e extrai os arquivos automaticamente na pasta
        api.dataset_download_files(dataset_id, path=dest_path, unzip=True)
        print(f"Dataset '{key}' extraído com sucesso!")

def copy_images(src_folder, dest_folder):
    """
    Varre recursivamente a pasta de origem procurando imagens (.jpg, .jpeg, .png)
    e as copia para a pasta destino correspondente.
    """
    if not os.path.exists(src_folder):
        print(f"Aviso: Pasta origem '{src_folder}' não existe.")
        return 0

    count = 0
    for root, _, files in os.walk(src_folder):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                src_file = os.path.join(root, file)
                # Adiciona prefixo incremental para evitar conflitos de nomes
                dest_file = os.path.join(dest_folder, f"{count}_{file}")
                shutil.copy2(src_file, dest_file)
                count += 1
    return count

def copy_selected_drowsiness_images(src_folder, dest_folder):
    """
    Varre a pasta de imagens procurando .jpg, .jpeg, .png.
    Para cada imagem, busca o arquivo correspondente na pasta 'labels' paralela à pasta 'images'.
    Se o arquivo de labels contiver as classes 0 (microsleep) ou 2 (yawning), copia a imagem.
    """
    if not os.path.exists(src_folder):
        print(f"Aviso: Pasta origem '{src_folder}' não existe.")
        return 0

    # Determina o diretório de labels (irmão de 'images')
    parent_dir = os.path.dirname(src_folder)
    labels_folder = os.path.join(parent_dir, "labels")

    if not os.path.exists(labels_folder):
        print(f"Aviso: Pasta de labels '{labels_folder}' não encontrada. Usando copy_images como fallback.")
        return copy_images(src_folder, dest_folder)

    count = 0
    for file in os.listdir(src_folder):
        if file.lower().endswith(('.png', '.jpg', '.jpeg')):
            src_file = os.path.join(src_folder, file)
            # Nome correspondente do label
            label_name = os.path.splitext(file)[0] + ".txt"
            label_path = os.path.join(labels_folder, label_name)

            should_copy = False
            if os.path.exists(label_path):
                with open(label_path, "r") as lf:
                    for line in lf:
                        parts = line.strip().split()
                        if parts:
                            try:
                                cid = int(parts[0])
                                if cid in (0, 2):  # microsleep ou yawning
                                    should_copy = True
                                    break
                            except ValueError:
                                pass

            if should_copy:
                dest_file = os.path.join(dest_folder, f"{count}_{file}")
                shutil.copy2(src_file, dest_file)
                count += 1
    return count


def reorganize_datasets():
    """
    Varre as pastas baixadas temporariamente do Kaggle e reorganiza as imagens
    dentro da pasta final estruturada para o treinamento em 8 classes.
    """
    print("\n==================================================")
    print("2. REORGANIZANDO IMAGENS NAS PASTAS DE CLASSES...")
    print("==================================================")

    temp_dir = TEMP_DATASETS_DIR
    base_dataset_dir = DATASET_DIR

    # List of all classes (original + new)
    classes = ["dor", "enjoo", "medo", "sono", "tristeza", "neutro", "acordado", "dormindo"]

    # Ensure base folder exists
    if not os.path.exists(base_dataset_dir):
        os.makedirs(base_dataset_dir)

    # Remove only the original class subfolders to avoid wiping new class data
    for c in ["dor", "enjoo", "medo", "sono", "tristeza"]:
        dir_path = os.path.join(base_dataset_dir, c)
        if os.path.isdir(dir_path):
            shutil.rmtree(dir_path)

    # Recreate all class subfolders (including new ones)
    for c in classes:
        os.makedirs(os.path.join(base_dataset_dir, c), exist_ok=True)

    # ----------------------------------------------------
    # CLASSE: dor (pain-detection-face-expressions)
    # ----------------------------------------------------
    dor_temp_root = os.path.join(temp_dir, "dor")
    pain_src = None
    for root, dirs, _ in os.walk(dor_temp_root):
        for d in dirs:
            if d.lower() == "original":
                pain_src = os.path.join(root, d)
                break
        if pain_src:
            break

    if not pain_src:
        pain_src = dor_temp_root # Fallback se não achar a pasta "Original"

    count_dor = copy_images(pain_src, os.path.join(base_dataset_dir, "dor"))
    print(f"-> Dor: {count_dor} imagens organizadas.")

    # ----------------------------------------------------
    # CLASSES: medo, enjoo, tristeza (CK+48 do CKPlus)
    # disgust -> enjoo, sadness -> tristeza, fear -> medo
    # ----------------------------------------------------
    ckplus_temp_root = os.path.join(temp_dir, "ckplus")
    disgust_src = None
    sadness_src = None
    fear_src = None

    for root, dirs, _ in os.walk(ckplus_temp_root):
        for d in dirs:
            if d.lower() == "disgust":
                disgust_src = os.path.join(root, d)
            elif d.lower() == "sadness":
                sadness_src = os.path.join(root, d)
            elif d.lower() == "fear":
                fear_src = os.path.join(root, d)

    count_enjoo = copy_images(disgust_src, os.path.join(base_dataset_dir, "enjoo")) if disgust_src else 0
    count_tristeza = copy_images(sadness_src, os.path.join(base_dataset_dir, "tristeza")) if sadness_src else 0
    count_medo = copy_images(fear_src, os.path.join(base_dataset_dir, "medo")) if fear_src else 0
    
    print(f"-> Enjoo (Disgust): {count_enjoo} imagens organizadas.")
    print(f"-> Tristeza (Sadness): {count_tristeza} imagens organizadas.")
    print(f"-> Medo (Fear): {count_medo} imagens organizadas.")

    # ----------------------------------------------------
    # CLASSE: sono (drowsiness-detection)
    # yawning + microsleep -> sono
    # ----------------------------------------------------
    drowsiness_temp_root = os.path.join(temp_dir, "drowsiness")
    sono_dest = os.path.join(base_dataset_dir, "sono")
    count_sono = 0

    # Busca imagens recursivamente nas subpastas train/images/ e test/images/
    drowsiness_subdirs = []
    for root, dirs, _ in os.walk(drowsiness_temp_root):
        for d in dirs:
            if d.lower() == "images":
                parent_dir = os.path.basename(root).lower()
                if parent_dir in ("train", "test"):
                    drowsiness_subdirs.append(os.path.join(root, d))

    for subdir in drowsiness_subdirs:
        print(f"Copiando imagens de sono de: {subdir}")
        count_sono += copy_selected_drowsiness_images(subdir, sono_dest)

    # Fallback caso não encontre as subpastas train/images ou test/images com o nome esperado
    if count_sono == 0:
        print("Aviso: Pastas train/images ou test/images não detectadas de forma estruturada. Varrendo tudo recursivamente.")
        count_sono += copy_selected_drowsiness_images(drowsiness_temp_root, sono_dest)

    print(f"-> Sono (Yawning/Sleep): {count_sono} imagens organizadas.")

    # Remove download folders to avoid PyTorch loading them as classes
    for folder in ["teleicu_download", "expression_download", "_tmp"]:
        dir_path = os.path.join(base_dataset_dir, folder)
        if os.path.exists(dir_path):
            shutil.rmtree(dir_path)

    print("Organização de pastas concluída!")

def train_and_export_model():
    """
    Treina o modelo MobileNetV2 do PyTorch com as imagens reorganizadas
    e em seguida efetua a exportação em formato ONNX para a API C#.
    """
    print("\n==================================================")
    print("3. CARREGANDO E TREINANDO O MODELO MOBILENETV2...")
    print("==================================================")

    base_dataset_dir = DATASET_DIR
    
    # 1. Transformações das imagens (Média/Std ImageNet para coincidir com o ImagePreprocessing da API C#)
    data_transforms = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

    # 2. Carrega as imagens do dataset final estruturado
    full_dataset = datasets.ImageFolder(root=base_dataset_dir, transform=data_transforms)
    # Enforce explicit class order for mapping
    desired_order = ["dor", "enjoo", "medo", "sono", "tristeza", "neutro", "acordado", "dormindo"]
    class_to_idx = {cls: i for i, cls in enumerate(desired_order)}
    original_classes = full_dataset.classes
    full_dataset.class_to_idx = class_to_idx
    full_dataset.classes = desired_order
    # Update samples to reflect new indices
    mapped_samples = [(p, class_to_idx[original_classes[class_idx]]) for p, class_idx in full_dataset.samples]
    
    # Under-sample classes to a maximum of 300 images
    import random
    from collections import defaultdict
    
    grouped_samples = defaultdict(list)
    for p, label in mapped_samples:
        grouped_samples[label].append((p, label))
        
    final_samples = []
    class_counts = {}
    rng = random.Random(42)  # Fixed seed for reproducibility
    
    for label_idx, label_name in enumerate(desired_order):
        samples_in_class = grouped_samples[label_idx]
        count = len(samples_in_class)
        if count > 300:
            sampled = rng.sample(samples_in_class, 300)
            class_counts[label_name] = 300
        else:
            sampled = samples_in_class
            class_counts[label_name] = count
        final_samples.extend(sampled)
        
    full_dataset.samples = final_samples
    full_dataset.targets = [label for _, label in final_samples]
    
    print("\n==================================================")
    print("CONTAGEM FINAL DE IMAGENS POR CLASSE (PÓS-UNDERSAMPLING):")
    for name, count in class_counts.items():
        print(f"  {name}: {count} imagens")
    print(f"Tamanho total do dataset reduzido: {len(full_dataset)} imagens.")
    print("==================================================\n")
    print(f"Mapeamento de classes forçado: {full_dataset.class_to_idx}")

    # Divisão de Treino e Validação (80% treino, 20% validação)
    train_size = int(0.8 * len(full_dataset))
    val_size = len(full_dataset) - train_size
    train_dataset, val_dataset = random_split(full_dataset, [train_size, val_size])

    train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=16, shuffle=False)

    # 3. Inicializa MobileNetV2 pré-treinado para Transfer Learning
    try:
        model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT)
        print("MobileNetV2 carregado com pesos padrões ImageNet.")
    except AttributeError:
        model = models.mobilenet_v2(pretrained=True)
        print("MobileNetV2 carregado com método legado pretrained=True.")

    # Congela pesos convolucionais iniciais para focar o treino apenas no classificador
    for param in model.parameters():
        param.requires_grad = False

    # Redefine a camada densa de classificação final para as 5 classes
    num_ftrs = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(num_ftrs, 8)

    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    model = model.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.classifier[1].parameters(), lr=0.001)

    # 4. Épocas de Treinamento
    epochs = 5
    print(f"Iniciando ciclo de Fine-Tuning por {epochs} épocas no dispositivo: {device}")
    
    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        corrects = 0

        for inputs, labels in train_loader:
            inputs, labels = inputs.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item() * inputs.size(0)
            _, preds = torch.max(outputs, 1)
            corrects += torch.sum(preds == labels.data)

        epoch_loss = running_loss / train_size
        epoch_acc = corrects.double() / train_size
        print(f"Época {epoch+1}/{epochs} — Loss: {epoch_loss:.4f} | Acurácia: {epoch_acc:.4f}")

    print("Treinamento concluído com êxito!")

    # Cria diretório de checkpoint e salva os pesos locais
    os.makedirs("../checkpoints", exist_ok=True)
    checkpoint_path = "../checkpoints/mobilenet_v2_emotions.pth"
    torch.save(model.state_dict(), checkpoint_path)
    print(f"Pesos do modelo PyTorch salvos em: {checkpoint_path}")

    # ----------------------------------------------------
    # 5. EXPORTAÇÃO DIRETAMENTE NO FORMATO ONNX PARA A API C#
    # ----------------------------------------------------
    print("\n==================================================")
    print("4. EXPORTANDO MODELO TREINADO PARA ONNX...")
    print("==================================================")

    model.eval()
    dummy_input = torch.randn(1, 3, 224, 224).to(device)

    # Caminho final no projeto C# PerceptAI.API
    onnx_dest_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../PerceptAI.API/ML/model.onnx"))
    os.makedirs(os.path.dirname(onnx_dest_path), exist_ok=True)

    torch.onnx.export(
        model,
        dummy_input,
        onnx_dest_path,
        export_params=True,
        opset_version=11,
        do_constant_folding=True,
        input_names=['input'],     # Assinatura de entrada da API C#
        output_names=['output'],   # Assinatura de saída da API C#
        dynamic_axes={
            'input': {0: 'batch_size'},
            'output': {0: 'batch_size'}
        }
    )

    print(f"Exportação finalizada!")
    print(f"Arquivo model.onnx gerado no diretório da API C#: {onnx_dest_path}")

import download_roboflow

if __name__ == "__main__":
    try:
        # Clean Roboflow destination folders to avoid accumulating duplicates
        for clean_c in ["acordado", "dormindo", "neutro"]:
            clean_path = os.path.join(DATASET_DIR, clean_c)
            if os.path.exists(clean_path):
                shutil.rmtree(clean_path)

        download_and_extract_datasets()
        # Download Roboflow datasets (TeleICU and Expression‑Recognition)
        download_roboflow.main()
        # Extract classes from TeleICU CSV (acordado & dormindo)
        extract_target_class.extract()
        # Extract neutral class from Expression‑Recognition dataset
        download_expression_neutro.main()
        reorganize_datasets()
        train_and_export_model()
    except Exception as e:
        print(f"\n[ERRO NO PIPELINE]: {e}")

