import os
import shutil
import zipfile
import csv
from pathlib import Path
from roboflow import Roboflow

API_KEY = "29sRbfHNwynVuzdbdg9r"
BASE_OUTPUT = Path(__file__).resolve().parent.parent / "dataset"
BASE_OUTPUT.mkdir(parents=True, exist_ok=True)

def download_and_extract(workspace: str, project: str, version: int) -> Path:
    """Download a dataset version using Roboflow SDK.
    Returns the path to the extracted directory (either a folder or a temp dir).
    """
    rf = Roboflow(api_key=API_KEY)
    proj = rf.workspace(workspace).project(project)
    ds_version = proj.version(version)
    print(f"Downloading {project} (workspace={workspace}) version {version} ...")
    obj = ds_version.download("multiclass", location=str(BASE_OUTPUT / "_tmp_download"))
    download_path = getattr(obj, "location", str(BASE_OUTPUT / "_tmp_download"))
    if os.path.isdir(download_path):
        return Path(download_path)
    # zip file case
    zip_path = Path(download_path)
    print(f"Extracting zip {zip_path} ...")
    with zipfile.ZipFile(zip_path, "r") as z:
        z.extractall(BASE_OUTPUT / "_tmp_download")
    return BASE_OUTPUT / "_tmp_download"

def find_neutral_csv(root: Path) -> tuple[Path, Path] | None:
    """Search for a _classes.csv containing a 'Neutral' column.
    Returns (csv_path, images_root) or None.
    """
    for candidate in root.rglob("_classes.csv"):
        with open(candidate, newline="") as f:
            reader = csv.reader(f)
            header = next(reader)
            if any(col.lower().strip() == "neutral" for col in header):
                return candidate, candidate.parent
    return None

def copy_neutral_images(csv_path: Path, images_root: Path, dest_dir: Path) -> int:
    """Copy all images where Neutral == '1' into dest_dir.
    Returns the number of copied images.
    """
    dest_dir.mkdir(parents=True, exist_ok=True)
    with open(csv_path, newline="") as f:
        reader = csv.reader(f)
        header = next(reader)
        neutral_idx = [h.lower().strip() for h in header].index("neutral")
    copied = 0
    with open(csv_path, newline="") as f:
        reader = csv.reader(f)
        next(reader)
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
    return copied

def clean_tmp():
    tmp = BASE_OUTPUT / "_tmp_download"
    if tmp.exists():
        shutil.rmtree(tmp)
    tmp.mkdir(parents=True, exist_ok=True)

def main():
    # 1. Download teleicu (try version 3 -> 2 -> 1)
    clean_tmp()
    teleicu_path = None
    for v in [3, 2, 1]:
        try:
            teleicu_path = download_and_extract("workworkwork-gk4pa", "teleicu-l8owr", v)
            break
        except Exception as e:
            print(f"Teleicu version {v} failed: {e}")
    if teleicu_path is None:
        raise RuntimeError("All teleicu versions failed to download")
    print("--- Teleicu dataset files (recursive) ---")
    for p in teleicu_path.rglob("*"):
        if p.is_file():
            print(p)

    # 2. Download expression-recognition, looking for Neutral column
    clean_tmp()
    expr_path = None
    csv_path = None
    images_root = None
    for v in [2, 1]:
        try:
            expr_path = download_and_extract("jeja-jaya-jaya-jaya", "expression-recognition", v)
        except Exception as e:
            print(f"Expression-recognition version {v} download failed: {e}")
            continue
        result = find_neutral_csv(expr_path)
        if result:
            csv_path, images_root = result
            print(f"Found Neutral CSV in version {v} at {csv_path}")
            break
        else:
            print(f"Version {v} does not contain a Neutral column, trying next version...")
    if csv_path is None:
        raise RuntimeError("Could not find a _classes.csv with a 'Neutral' column in any version of expression-recognition")

    # Copy neutral images
    copied = copy_neutral_images(csv_path, images_root, BASE_OUTPUT / "neutro")
    print(f"Copied {copied} neutral images to {BASE_OUTPUT / 'neutro'}")

    # Show Get-ChildItem (list) of the extracted folder and of the final neutro folder
    print("--- Extracted expression-recognition files (recursive) ---")
    for p in expr_path.rglob("*"):
        if p.is_file():
            print(p)
    print("--- Final neutro folder contents ---")
    for p in (BASE_OUTPUT / "neutro").iterdir():
        print(p)

if __name__ == "__main__":
    main()
