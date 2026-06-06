import os
import shutil
import zipfile
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, random_split
from torchvision import models, transforms, datasets

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

    temp_dir = os.path.abspath("./temp_datasets")
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

def reorganize_datasets():
    """
    Varre as pastas baixadas temporariamente do Kaggle e reorganiza as imagens
    dentro da pasta final estruturada para o treinamento em 5 classes.
    """
    print("\n==================================================")
    print("2. REORGANIZANDO IMAGENS NAS PASTAS DE CLASSES...")
    print("==================================================")

    temp_dir = os.path.abspath("./temp_datasets")
    base_dataset_dir = os.path.abspath("./dataset")

    classes = ["medo", "enjoo", "dor", "sono", "tristeza"]
    
    # Limpa ou inicializa a pasta final do dataset
    if os.path.exists(base_dataset_dir):
        print(f"Limpando pasta de dataset anterior: {base_dataset_dir}")
        shutil.rmtree(base_dataset_dir)
        
    for c in classes:
        os.makedirs(os.path.join(base_dataset_dir, c), exist_ok=True)

    # ----------------------------------------------------
    # CLASSE: dor (pain-detection-face-expressions)
    # Procuramos recursivamente a pasta "Original" de forma case-insensitive
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
        count_sono += copy_images(subdir, sono_dest)

    # Fallback caso não encontre as subpastas train/images ou test/images com o nome esperado
    if count_sono == 0:
        print("Aviso: Pastas train/images ou test/images não detectadas de forma estruturada. Varrendo tudo recursivamente.")
        count_sono += copy_images(drowsiness_temp_root, sono_dest)

    print(f"-> Sono (Yawning/Sleep): {count_sono} imagens organizadas.")
    print("Organização de pastas concluída!")

def train_and_export_model():
    """
    Treina o modelo MobileNetV2 do PyTorch com as imagens reorganizadas
    e em seguida efetua a exportação em formato ONNX para a API C#.
    """
    print("\n==================================================")
    print("3. CARREGANDO E TREINANDO O MODELO MOBILENETV2...")
    print("==================================================")

    base_dataset_dir = os.path.abspath("./dataset")
    
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
    print(f"Tamanho total do dataset: {len(full_dataset)} imagens.")
    print(f"Mapeamento de classes: {full_dataset.class_to_idx}")

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
    model.classifier[1] = nn.Linear(num_ftrs, 5)

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

if __name__ == "__main__":
    try:
        download_and_extract_datasets()
        reorganize_datasets()
        train_and_export_model()
    except Exception as e:
        print(f"\n[ERRO NO PIPELINE]: {e}")
