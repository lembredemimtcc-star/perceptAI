# extract_neutral_coco.py

"""
Extract images of the "Neutral" class from the COCO format datasets downloaded via Roboflow.
The script:
1. Cleans the target folder `dataset/neutro/`.
2. Looks for COCO annotation files in the extracted folders (v2 then v1).
3. Determines the category ID for "Neutral" (case‑insensitive).
4. Crops each annotation bounding box from the corresponding source image.
5. Saves the cropped images into `dataset/neutro/` with unique filenames.
"""

import os
import json
import shutil
from pathlib import Path

from PIL import Image

# --- Configuration ---
BASE_DIR = Path(__file__).resolve().parent.parent
DATASET_DIR = BASE_DIR / "dataset"
TMP_COCO_DIR = DATASET_DIR / "_tmp_coco"
NEUTRO_DIR = DATASET_DIR / "neutro"

# Ensure a clean neutro folder
if NEUTRO_DIR.exists():
    shutil.rmtree(NEUTRO_DIR)
NEUTRO_DIR.mkdir(parents=True, exist_ok=True)

def find_annotation_file(root: Path) -> Path | None:
    """Recursively search for a file ending with '.coco.json' within *root*.
    Returns the first match or ``None`` if not found.
    """
    for dirpath, _, filenames in os.walk(root):
        for fname in filenames:
            if fname.lower().endswith('.coco.json'):
                return Path(dirpath) / fname
    return None

def load_coco_annotations(json_path: Path):
    with open(json_path, "r", encoding="utf-8") as f:
        return json.load(f)

def get_neutral_category_id(categories):
    for cat in categories:
        if cat.get("name", "").lower() == "neutral":
            return cat.get("id")
    return None

def extract_neutral_images(extracted_root: Path):
    ann_path = find_annotation_file(extracted_root)
    if not ann_path:
        print(f"[WARN] No COCO annotation file found in {extracted_root}")
        return 0
    data = load_coco_annotations(ann_path)
    categories = data.get("categories", [])
    neutral_id = get_neutral_category_id(categories)
    if neutral_id is None:
        print(f"[INFO] \"Neutral\" category not present in {ann_path}")
        return 0
    # Build a map of image_id -> file_name
    img_map = {img["id"]: img["file_name"] for img in data.get("images", [])}
    count = 0
    for ann in data.get("annotations", []):
        if ann.get("category_id") != neutral_id:
            continue
        image_id = ann.get("image_id")
        bbox = ann.get("bbox")  # [x, y, width, height]
        if not bbox:
            continue
        img_name = img_map.get(image_id)
        if not img_name:
            continue
        # Images are located in the "train" (or sometimes root) subfolder of the extracted version
        possible_dirs = [extracted_root / "train", extracted_root]
        img_path = None
        for d in possible_dirs:
            candidate = d / img_name
            if candidate.is_file():
                img_path = candidate
                break
        if not img_path:
            continue
        try:
            with Image.open(img_path) as im:
                x, y, w, h = map(int, bbox)
                cropped = im.crop((x, y, x + w, y + h))
                out_name = f"neutral_{image_id}_{ann.get('id')}.jpg"
                out_path = NEUTRO_DIR / out_name
                cropped.save(out_path)
                count += 1
        except Exception as e:
            print(f"[ERROR] Failed processing {img_path}: {e}")
    print(f"Extracted {count} neutral images from {extracted_root.name}")
    return count

def main():
    total_extracted = 0
    # Prefer version 2 then fallback to version 1
    for subdir in ["extracted", "extracted_v1"]:
        root = TMP_COCO_DIR / subdir
        if root.is_dir():
            total_extracted += extract_neutral_images(root)
    print(f"Total neutral images extracted: {total_extracted}")

if __name__ == "__main__":
    main()
