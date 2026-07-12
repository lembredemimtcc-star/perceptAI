import os
import zipfile
import json
from pathlib import Path
from PIL import Image

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
TMP_DIR = BASE_DIR / "dataset" / "_tmp_coco"
ZIP_PATH = TMP_DIR / "Expression Recognition.v2i.coco.zip"
EXTRACT_DIR = TMP_DIR / "extracted"
NEUTRO_DIR = BASE_DIR / "dataset" / "neutro"

def extract_zip():
    if not ZIP_PATH.is_file():
        raise FileNotFoundError(f"COCO zip not found at {ZIP_PATH}")
    if EXTRACT_DIR.exists():
        # Clean previous extraction
        for child in EXTRACT_DIR.iterdir():
            if child.is_dir():
                for sub in child.rglob('*'):
                    sub.unlink()
                child.rmdir()
            else:
                child.unlink()
    else:
        EXTRACT_DIR.mkdir(parents=True)
    print(f"Extracting {ZIP_PATH} to {EXTRACT_DIR} ...")
    with zipfile.ZipFile(ZIP_PATH, "r") as z:
        z.extractall(EXTRACT_DIR)
    print("Extraction complete.")

def find_annotation_json(root: Path) -> Path:
    for p in root.rglob("*_annotations.coco.json"):
        return p
    raise FileNotFoundError("COCO annotation JSON not found after extraction")

def extract_neutral_crops(annotation_path: Path, extracted_root: Path, dest_dir: Path) -> int:
    with open(annotation_path, "r", encoding="utf-8") as f:
        coco = json.load(f)
    # Determine neutral category id (case‑insensitive)
    neutral_id = None
    for cat in coco.get("categories", []):
        if cat.get("name", "").lower() == "neutral":
            neutral_id = cat.get("id")
            break
    if neutral_id is None:
        raise RuntimeError("Neutral category not found in COCO annotations")

    # Map image_id -> file path
    img_map = {}
    for img in coco.get("images", []):
        img_id = img.get("id")
        fname = img.get("file_name")
        candidates = list(extracted_root.rglob(fname))
        if candidates:
            img_map[img_id] = candidates[0]
        else:
            print(f"Warning: image {fname} (id {img_id}) not found in extracted files")

    dest_dir.mkdir(parents=True, exist_ok=True)
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
                crop.save(dest_dir / out_name)
                count += 1
        except Exception as e:
            print(f"Failed to crop {img_path}: {e}")
    return count

def main():
    extract_zip()
    annotation_path = find_annotation_json(EXTRACT_DIR)
    print(f"Annotation JSON found: {annotation_path}")
    num = extract_neutral_crops(annotation_path, EXTRACT_DIR, NEUTRO_DIR)
    print(f"Extracted {num} Neutral crops to {NEUTRO_DIR}")
    print("--- Files in dataset/neutro/ ---")
    for p in NEUTRO_DIR.iterdir():
        print(p.name)

if __name__ == "__main__":
    main()
