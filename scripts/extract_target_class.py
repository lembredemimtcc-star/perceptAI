import random
import shutil
from pathlib import Path

BASE_OUTPUT = Path(__file__).resolve().parent.parent / "dataset"
DDD_ROOT = Path(__file__).resolve().parent.parent / "temp_datasets" / "driver_drowsiness" / "Driver Drowsiness Dataset (DDD)"

TARGETS = {
    "acordado": DDD_ROOT / "Non Drowsy",
    "dormindo": DDD_ROOT / "Drowsy",
}

COUNT_PER_CLASS = 300
SEEDS = {"acordado": 42, "dormindo": 43}

def extract():
    for class_name, src_dir in TARGETS.items():
        dest_dir = BASE_OUTPUT / class_name
        dest_dir.mkdir(parents=True, exist_ok=True)

        if not src_dir.exists():
            print(f"Aviso: pasta de origem nao encontrada para {class_name}: {src_dir}")
            continue

        files = [f for f in src_dir.iterdir() if f.is_file()]
        random.seed(SEEDS[class_name])
        count = min(COUNT_PER_CLASS, len(files))
        selected = random.sample(files, count)

        for f in selected:
            shutil.copy2(f, dest_dir / f.name)

        print(f"{class_name}: {count} imagens copiadas de {src_dir}")

if __name__ == "__main__":
    extract()
