import os
import shutil
import zipfile
import csv
import requests
from pathlib import Path

API_KEY = "29sRbfHNwynVuzdbdg9r"
BASE_OUTPUT = Path(__file__).resolve().parent.parent / "dataset"
BASE_OUTPUT.mkdir(parents=True, exist_ok=True)

NEUTRAL_ZIP_URL = f"https://api.roboflow.com/dataset/expression-recognition/version/1/download?format=multiclass&api_key={API_KEY}"

def download_and_extract_neutral():
    tmp_dir = BASE_OUTPUT / "_tmp_neutro"
    if tmp_dir.exists():
        shutil.rmtree(tmp_dir)
    tmp_dir.mkdir(parents=True, exist_ok=True)
    zip_path = tmp_dir / "neutral.zip"
    print("Downloading neutral dataset zip...")
    resp = requests.get(NEUTRAL_ZIP_URL, stream=True)
    resp.raise_for_status()
    with open(zip_path, "wb") as f:
        for chunk in resp.iter_content(chunk_size=8192):
            f.write(chunk)
    print(f"Saved zip to {zip_path}")
    print("Extracting zip...")
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(tmp_dir)
    # Locate the _classes.csv containing 'Neutral' column
    csv_path = None
    train_root = None
    for candidate in tmp_dir.rglob("_classes.csv"):
        with open(candidate, newline="") as f:
            reader = csv.reader(f)
            header = next(reader)
            if any(col.lower().strip() == "neutral" for col in header):
                csv_path = candidate
                train_root = candidate.parent
                break
    if not csv_path:
        raise FileNotFoundError("Could not find _classes.csv with 'Neutral' column in the extracted neutral dataset.")
    print(f"Found CSV at {csv_path}, images root {train_root}")
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
                src = train_root / img_name
                if src.exists():
                    dst = dest_dir / f"{copied}_{img_name}"
                    shutil.copy2(src, dst)
                    copied += 1
                else:
                    print(f"Warning: source image not found {src}")
    print(f"Copied {copied} neutral images to {dest_dir}")

if __name__ == "__main__":
    download_and_extract_neutral()
