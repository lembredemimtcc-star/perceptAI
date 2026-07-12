import os
import shutil
import zipfile
import json
from pathlib import Path
from roboflow import Roboflow
from PIL import Image

API_KEY = "29sRbfHNwynVuzdbdg9r"
BASE_OUTPUT = Path(__file__).resolve().parent.parent / "dataset"
BASE_OUTPUT.mkdir(parents=True, exist_ok=True)

def download_coco_dataset():
    """Download expression‑recognition version 2 in COCO format and extract it.
    Returns the path to the extracted dataset directory.
    """
    tmp_dir = BASE_OUTPUT / "_tmp_coco"
    if tmp_dir.exists():
        shutil.rmtree(tmp_dir)
    tmp_dir.mkdir(parents=True, exist_ok=True)
    rf = Roboflow(api_key=API_KEY)
    proj = rf.workspace("jeja-jaya-jaya-jaya").project("expression-recognition")
    # Attempt version 2, fallback to version 1
    try:
        version_obj = proj.version(2)
        print("Downloading expression-recognition version 2 in COCO format...")
        obj = version_obj.download("coco")
    except Exception as e:
        print(f"Version 2 download failed ({e}), trying version 1...")
        version_obj = proj.version(1)
        print("Downloading expression-recognition version 1 in COCO format...")
        obj = version_obj.download("coco")
    # obj may be a Path or have .location attribute
    download_path = getattr(obj, "location", None) or str(obj)
    print(f"Download returned path: {download_path}")
    if zipfile.is_zipfile(download_path):
        print(f"Extracting zip {download_path} ...")
        with zipfile.ZipFile(download_path, "r") as z:
            z.extractall(tmp_dir)
        extracted_path = tmp_dir
    else:
        extracted_path = Path(download_path)
    return extracted_path

def find_coco_annotation(root: Path) -> Path:
    """Locate the COCO annotation JSON file (usually ends with _annotations.coco.json)."""
    for p in root.rglob("*_annotations.coco.json"):
        return p
    raise FileNotFoundError("COCO annotation JSON not found in the extracted dataset")

def extract_neutral_crops(annotation_path: Path, extracted_root: Path, dest_dir: Path) -> int:
    """Read COCO JSON, keep only annotations whose category name is 'Neutral',
    crop the corresponding image region and save it to dest_dir.
    Returns the number of saved crops.
    """
    with open(annotation_path, "r", encoding="utf-8") as f:
        coco = json.load(f)
    # Find the category id for Neutral (case‑insensitive)
    neutral_cat_id = None
    for cat in coco.get("categories", []):
        if cat.get("name", "").lower() == "neutral":
            neutral_cat_id = cat.get("id")
            break
    if neutral_cat_id is None:
        raise RuntimeError("No category named 'Neutral' found in COCO annotations")

    # Build a map from image id to file name and full path
    image_id_to_path = {}
    for img in coco.get("images", []):
        img_id = img.get("id")
        file_name = img.get("file_name")
        # Search for the image file inside the extracted root (could be in subfolders)
        candidates = list(extracted_root.rglob(file_name))
        if not candidates:
            print(f"Warning: image file {file_name} not found for image id {img_id}")
            continue
        image_id_to_path[img_id] = candidates[0]

    dest_dir.mkdir(parents=True, exist_ok=True)
    count = 0
    for ann in coco.get("annotations", []):
        if ann.get("category_id") != neutral_cat_id:
            continue
        img_id = ann.get("image_id")
        bbox = ann.get("bbox")  # COCO format: [x, y, width, height]
        if img_id not in image_id_to_path or not bbox:
            continue
        img_path = image_id_to_path[img_id]
        try:
            with Image.open(img_path) as im:
                x, y, w, h = map(int, map(round, bbox))
                cropped = im.crop((x, y, x + w, y + h))
                out_name = f"{count}_{img_path.name}"
                out_path = dest_dir / out_name
                cropped.save(out_path)
                count += 1
        except Exception as e:
            print(f"Failed to process {img_path}: {e}")
    return count

def main():
    # Step 1: download and extract COCO dataset
    extracted_root = download_coco_dataset()
    print(f"Extracted dataset root: {extracted_root}")

    # Step 2: locate COCO annotation file
    annotation_path = find_coco_annotation(extracted_root)
    print(f"Found COCO annotation JSON: {annotation_path}")

    # Step 3: extract Neutral crops
    neutro_dir = BASE_OUTPUT / "neutro"
    num_crops = extract_neutral_crops(annotation_path, extracted_root, neutro_dir)
    print(f"Extracted {num_crops} Neutral image crops to {neutro_dir}")

    # Optional: list resulting files
    print("--- Files in dataset/neutro/ ---")
    for p in neutro_dir.iterdir():
        print(p.name)

if __name__ == "__main__":
    main()
