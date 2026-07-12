import os
import shutil
import zipfile
import csv
from pathlib import Path
from roboflow import Roboflow

API_KEY = "29sRbfHNwynVuzdbdg9r"
BASE_OUTPUT = Path(__file__).resolve().parent.parent / "dataset"
BASE_OUTPUT.mkdir(parents=True, exist_ok=True)

WORKSPACE = "jeja-jaya-jaya-jaya"
PROJECT = "expression-recognition"
VERSION = 1  # adjust if needed

def download_neutral_dataset():
    tmp_dir = BASE_OUTPUT / "_tmp_neutro"
    if tmp_dir.exists():
        shutil.rmtree(tmp_dir)
    tmp_dir.mkdir(parents=True, exist_ok=True)
    rf = Roboflow(api_key=API_KEY)
    project = rf.workspace(WORKSPACE).project(PROJECT)
    version = project.version(VERSION)
    print("Downloading neutral dataset (multiclass)...")
    dataset_obj = version.download("multiclass", location=str(tmp_dir))
    # The SDK may return a zip file path or an extracted directory
    download_path = getattr(dataset_obj, "location", str(tmp_dir))
    if os.path.isdir(download_path):
        extracted_path = Path(download_path)
    else:
        # Assume a zip file was returned
        zip_path = Path(download_path)
        print(f"Extracting zip {zip_path}...")
        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            zip_ref.extractall(tmp_dir)
        extracted_path = tmp_dir
    return extracted_path

def extract_neutral_images(extracted_path: Path):
    # Locate the _classes.csv containing a 'Neutral' column
    csv_path = None
    images_root = None
    for candidate in extracted_path.rglob("_classes.csv"):
        with open(candidate, newline="") as f:
            reader = csv.reader(f)
            header = next(reader)
            if any(col.lower().strip() == "neutral" for col in header):
                csv_path = candidate
                images_root = candidate.parent  # images are typically in the same folder
                break
    if not csv_path:
        raise FileNotFoundError("Could not find _classes.csv with a 'Neutral' column in the extracted dataset.")
    print(f"Found CSV at {csv_path}, images root {images_root}")
    # Determine column index for Neutral
    with open(csv_path, newline="") as f:
        reader = csv.reader(f)
        header = next(reader)
        neutral_idx = [h.lower().strip() for h in header].index("neutral")
    dest_dir = BASE_OUTPUT / "neutro"
    dest_dir.mkdir(parents=True, exist_ok=True)
    copied = 0
    with open(csv_path, newline="") as f:
        reader = csv.reader(f)
        next(reader)  # skip header
        for row in reader:
            img_name = row[0]
            if row[neutral_idx] == "1":
                src = images_root / img_name
                if src.exists():
                    dst = dest_dir / f"{copied}_{img_name}"
                    shutil.copy2(src, dst)
                    copied += 1
                else:
                    print(f"Warning: source image not found {src}")
    print(f"Copied {copied} neutral images to {dest_dir}")

if __name__ == "__main__":
    extracted = download_neutral_dataset()
    extract_neutral_images(extracted)
