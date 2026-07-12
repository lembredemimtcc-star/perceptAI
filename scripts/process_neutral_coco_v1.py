import os
import zipfile
import json
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
TMP_DIR = BASE_DIR / "dataset" / "_tmp_coco"

# Identify the version‑1 ZIP (any zip that does NOT contain 'v2' in its name)
ZIP_V1 = None
for entry in TMP_DIR.iterdir():
    if entry.is_file() and entry.suffix.lower() == ".zip":
        if "v2" not in entry.name.lower():
            ZIP_V1 = entry
            break
if ZIP_V1 is None:
    raise FileNotFoundError("Version‑1 COCO zip not found in _tmp_coco")

EXTRACT_V1 = TMP_DIR / "extracted_v1"
# Clean previous extraction if any
if EXTRACT_V1.exists():
    for child in EXTRACT_V1.rglob('*'):
        if child.is_file():
            child.unlink()
        else:
            child.rmdir()
else:
    EXTRACT_V1.mkdir(parents=True)

print(f"Extracting {ZIP_V1.name} to {EXTRACT_V1} ...")
with zipfile.ZipFile(ZIP_V1, "r") as z:
    z.extractall(EXTRACT_V1)
print("Extraction complete.")

# Locate the COCO annotation JSON
annotation_path = None
for p in EXTRACT_V1.rglob("*_annotations.coco.json"):
    annotation_path = p
    break
if annotation_path is None:
    raise FileNotFoundError("COCO annotation JSON not found after extracting version‑1")
print(f"Annotation JSON found: {annotation_path}")

# Load JSON and list all categories
with open(annotation_path, "r", encoding="utf-8") as f:
    coco = json.load(f)
categories = coco.get("categories", [])
print("Categories present (id : name):")
for cat in categories:
    print(f"{cat.get('id')} : {cat.get('name')}")

# Check for Neutral (case‑insensitive)
neutral_id = None
for cat in categories:
    if cat.get("name", "").lower() == "neutral":
        neutral_id = cat.get("id")
        break

NEUTRO_DIR = BASE_DIR / "dataset" / "neutro"
NEUTRO_DIR.mkdir(parents=True, exist_ok=True)

if neutral_id is None:
    print("'Neutral' category NOT found in this version. No cropping will be performed.")
else:
    print(f"'Neutral' category FOUND with id {neutral_id}. Proceeding to crop images.")
    # Build image_id -> file path map
    img_map = {}
    for img in coco.get("images", []):
        img_id = img.get("id")
        fname = img.get("file_name")
        candidates = list(EXTRACT_V1.rglob(fname))
        if candidates:
            img_map[img_id] = candidates[0]
        else:
            print(f"Warning: image {fname} (id {img_id}) not found in extracted files")
    # Crop Neutral annotations
    count = 0
    for ann in coco.get("annotations", []):
        if ann.get("category_id") != neutral_id:
            continue
        img_id = ann.get("image_id")
        bbox = ann.get("bbox")  # [x, y, w, h]
        if img_id not in img_map or not bbox:
            continue
        img_path = img_map[img_id]
        try:
            with Image.open(img_path) as im:
                x, y, w, h = map(int, map(round, bbox))
                crop = im.crop((x, y, x + w, y + h))
                out_name = f"{count}_{img_path.name}"
                crop.save(NEUTRO_DIR / out_name)
                count += 1
        except Exception as e:
            print(f"Failed to crop {img_path}: {e}")
    print(f"Extracted {count} Neutral crops to {NEUTRO_DIR}")
    print("--- Files now in dataset/neutro/ ---")
    for p in NEUTRO_DIR.iterdir():
        print(p.name)

if __name__ == "__main__":
    # entry point for direct execution
    pass
