import os
import shutil
import zipfile
from pathlib import Path
from roboflow import Roboflow

API_KEY = "29sRbfHNwynVuzdbdg9r"
BASE_OUTPUT = Path(__file__).resolve().parent.parent / "dataset"
BASE_OUTPUT.mkdir(parents=True, exist_ok=True)

DATASETS = [
    {"workspace": "workworkwork-gk4pa", "project": "teleicu-l8owr", "class": "acordado_dormindo"},
    {"workspace": "jeja-jaya-jaya-jaya", "project": "expression-recognition", "class": "neutro"},
]

def download_and_extract(workspace: str, project_slug: str, folder_name: str):
    """Download a Roboflow dataset version and unzip it.
    The dataset is downloaded in multiclass format to the specific subfolder.
    """
    rf = Roboflow(api_key=API_KEY)
    target_path = BASE_OUTPUT / folder_name
    try:
        project = rf.workspace(workspace).project(project_slug)
    except Exception as e:
        raise RuntimeError(f"Failed to access project {project_slug} in workspace {workspace}: {e}")
    try:
        version = project.version(1)
    except Exception:
        version = project.version()
    dataset_obj = version.download("multiclass", location=str(target_path))
    download_path = getattr(dataset_obj, "location", str(target_path))
    if not isinstance(download_path, (str, bytes, os.PathLike)):
        download_path = str(download_path)
    if os.path.isdir(download_path):
        extracted_path = download_path
    else:
        with zipfile.ZipFile(download_path, "r") as zip_ref:
            zip_ref.extractall(str(target_path))
        extracted_path = str(target_path)
    print(f"Downloaded {workspace}/{project_slug} dataset to {extracted_path}")

def main():
    for ds in DATASETS:
        folder_name = "teleicu_download" if ds["class"] == "acordado_dormindo" else "expression_download"
        target_dir = BASE_OUTPUT / folder_name
        if target_dir.exists():
            shutil.rmtree(target_dir)
        download_and_extract(ds["workspace"], ds["project"], folder_name)
    print("All datasets downloaded and extracted under", BASE_OUTPUT)

if __name__ == "__main__":
    main()
