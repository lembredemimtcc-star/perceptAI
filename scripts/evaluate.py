import os
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, random_split
from torchvision import models, transforms, datasets
import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
import onnxruntime as ort

# Paths
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CHECKPOINT_PATH = os.path.join(PROJECT_ROOT, 'checkpoints', 'mobilenet_v2_emotions.pth')
ONNX_PATH = os.path.abspath(os.path.join(PROJECT_ROOT, '..', 'PerceptAI.API', 'ML', 'model.onnx'))
DATASET_ROOT = os.path.join(PROJECT_ROOT, 'dataset')

# Reproduce train split
SEED = 42  # assumed as train.py does not set explicit seed
torch.manual_seed(SEED)
np.random.seed(SEED)

# Transformations – must match train.py
data_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

desired_order = ["dor", "enjoo", "medo", "sono", "tristeza", "neutro", "acordado", "dormindo"]
class_to_idx = {cls: i for i, cls in enumerate(desired_order)}
class_names = desired_order

# Load dataset
full_dataset = datasets.ImageFolder(root=DATASET_ROOT, transform=data_transforms)
original_classes = full_dataset.classes
full_dataset.class_to_idx = class_to_idx
full_dataset.classes = desired_order

# Update samples to reflect new indices
mapped_samples = [(p, class_to_idx[original_classes[class_idx]]) for p, class_idx in full_dataset.samples]

# Apply same undersampling logic
import random
from collections import defaultdict
grouped_samples = defaultdict(list)
for p, label in mapped_samples:
    grouped_samples[label].append((p, label))
    
final_samples = []
rng = random.Random(42)  # Fixed seed matching train.py
for label_idx in range(len(desired_order)):
    samples_in_class = grouped_samples[label_idx]
    if len(samples_in_class) > 300:
        sampled = rng.sample(samples_in_class, 300)
    else:
        sampled = samples_in_class
    final_samples.extend(sampled)
    
full_dataset.samples = final_samples
full_dataset.targets = [label for _, label in final_samples]

train_size = int(0.8 * len(full_dataset))
val_size = len(full_dataset) - train_size
train_dataset, val_dataset = random_split(full_dataset, [train_size, val_size])

# --------------------------------------------------------------
# Contagem de imagens por classe no conjunto de validação
# --------------------------------------------------------------
from collections import Counter
val_labels = [label for _, label in val_dataset]
val_counts = Counter([class_names[l] for l in val_labels])
print("\n=== Imagens de validação por classe ===")
for cls in class_names:
    print(f"{cls:10}: {val_counts.get(cls, 0)}")
print("=======================================\n")

val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)

# Load model (prefer PyTorch checkpoint)
model = None
if os.path.exists(CHECKPOINT_PATH):
    # Build same architecture as training
    base_model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT)
    for param in base_model.parameters():
        param.requires_grad = False
    num_ftrs = base_model.classifier[1].in_features
    base_model.classifier[1] = nn.Linear(num_ftrs, len(class_names))
    base_model.load_state_dict(torch.load(CHECKPOINT_PATH, map_location='cpu'))
    base_model.eval()
    model = base_model
    device = torch.device('cpu')
    model.to(device)
    print(f"Loaded PyTorch checkpoint from {CHECKPOINT_PATH}")
else:
    # Fallback to ONNX runtime
    if not os.path.exists(ONNX_PATH):
        raise FileNotFoundError('Neither PyTorch checkpoint nor ONNX model found.')
    session = ort.InferenceSession(ONNX_PATH)
    input_name = session.get_inputs()[0].name
    print(f"Loaded ONNX model from {ONNX_PATH}")

# Inference
all_preds = []
all_labels = []
with torch.no_grad():
    for images, labels in val_loader:
        if model is not None:
            outputs = model(images)
            _, preds = torch.max(outputs, 1)
        else:
            # ONNX expects NCHW numpy array
            np_imgs = images.numpy()
            ort_outs = session.run([session.get_outputs()[0].name], {input_name: np_imgs})
            logits = torch.from_numpy(ort_outs[0])
            _, preds = torch.max(logits, 1)
        all_preds.extend(preds.cpu().numpy())
        all_labels.extend(labels.cpu().numpy())

y_true = np.array(all_labels)
y_pred = np.array(all_preds)

# Metrics
accuracy = accuracy_score(y_true, y_pred)
precision_macro = precision_score(y_true, y_pred, average='macro', zero_division=0)
recall_macro = recall_score(y_true, y_pred, average='macro', zero_division=0)
f1_macro = f1_score(y_true, y_pred, average='macro', zero_division=0)

precision_per = precision_score(y_true, y_pred, average=None, zero_division=0)
recall_per = recall_score(y_true, y_pred, average=None, zero_division=0)
f1_per = f1_score(y_true, y_pred, average=None, zero_division=0)
# Pad arrays if some classes have no samples
num_classes = len(class_names)
if len(precision_per) < num_classes:
    padding = [0.0] * (num_classes - len(precision_per))
    precision_per = list(precision_per) + padding
    recall_per = list(recall_per) + padding
    f1_per = list(f1_per) + padding

print("=== Métricas de Avaliação ===")
print(f"Acurácia geral: {accuracy:.4f}")
print(f"Precisão macro: {precision_macro:.4f}")
print(f"Recall macro: {recall_macro:.4f}")
print(f"F1-score macro: {f1_macro:.4f}")
print("--- Por classe ---")
for idx, cls in enumerate(class_names):
    print(f"{cls}: Precision={precision_per[idx]:.4f}, Recall={recall_per[idx]:.4f}, F1={f1_per[idx]:.4f}")

# Confusion matrix with explicit class labels
cm = confusion_matrix(y_true, y_pred, labels=range(num_classes))
plt.figure(figsize=(8,6))
ax = sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=class_names, yticklabels=class_names)
ax.set_xlabel('Predicted')
ax.set_ylabel('True')
ax.set_title('Matriz de Confusão')
conf_path = os.path.join(PROJECT_ROOT, 'scripts', 'confusion_matrix.png')
plt.tight_layout()
plt.savefig(conf_path)
print(f"Matriz de confusão salva em {conf_path}")
