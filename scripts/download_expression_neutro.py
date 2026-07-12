import os
import shutil
from pathlib import Path

# Ensure roboflow is installed
try:
    from roboflow import Roboflow
except ImportError:
    raise ImportError("Roboflow SDK not installed. Run 'pip install roboflow' first.")

API_KEY = "29sRbfHNwynVuzdbdg9r"
PROJECT_NAME = "expression-recognition"
WORKSPACE = "jeja-jaya-jaya-jaya"

BASE_OUTPUT = Path(__file__).resolve().parent.parent / "dataset"

def download_and_extract():
    rf = Roboflow(api_key=API_KEY)
    project = rf.workspace(WORKSPACE).project(PROJECT_NAME)
    # Use the latest version; multclass format for classification
    version = project.version(1)  # assuming version 1 exists
    # download as multiclass CSV which includes _classes.csv and images
    # Download dataset (multiclass) to temporary folder
    dataset_obj = version.download("multiclass", location=str(BASE_OUTPUT / "_tmp"))
    download_path = getattr(dataset_obj, "location", str(BASE_OUTPUT / "_tmp"))
    if not isinstance(download_path, (str, bytes, os.PathLike)):
        download_path = str(download_path)
    # If a zip file was returned, unzip it
    if os.path.isdir(download_path):
        dataset_path = download_path
    else:
        import zipfile
        with zipfile.ZipFile(download_path, "r") as zip_ref:
            zip_ref.extractall(str(BASE_OUTPUT / "_tmp"))
        dataset_path = str(BASE_OUTPUT / "_tmp")
    print(f"Downloaded expression-recognition dataset to {dataset_path}")

def extract_neutro():
    # Search for the _classes.csv that contains a 'Neutral' column within the temporary extraction folder.
    tmp_root = BASE_OUTPUT / "expression_download"
    csv_path = None
    train_root = None
    import csv
    for candidate in tmp_root.rglob("_classes.csv"):
        with open(candidate, newline="") as f:
            reader = csv.reader(f)
            header = next(reader)
            lower_header = [h.lower().strip() for h in header]
            if "neutral" in lower_header:
                csv_path = candidate
                # Assume the CSV resides in a 'train' subdirectory; set the corresponding image folder.
                train_root = candidate.parent
                break
    if csv_path is None or train_root is None:
        raise FileNotFoundError("Could not find a _classes.csv with a 'Neutral' column in the extracted dataset.")
    print(f"Using CSV at {csv_path} for Neutral extraction.")
    # Determine column index for Neutral.
    with open(csv_path, newline="") as f:
        reader = csv.reader(f)
        header = next(reader)
        lower_header = [h.lower().strip() for h in header]
        col_idx = lower_header.index("neutral")
    dest_dir = BASE_OUTPUT / "neutro"
    dest_dir.mkdir(parents=True, exist_ok=True)
    # Iterate rows again to copy images where Neutral == "1".
    with open(csv_path, newline="") as f:
        reader = csv.reader(f)
        next(reader)  # skip header
        for row in reader:
            img_name = row[0]
            if row[col_idx] == "1":
                src_path = train_root / img_name
                if src_path.exists():
                    count = len(list(dest_dir.iterdir()))
                    dst_path = dest_dir / f"{count}_{img_name}"
                    shutil.copy2(src_path, dst_path)
                else:
                    print(f"Warning: source image not found {src_path}")

def main():
    extract_neutro()

if __name__ == "__main__":
    main()
