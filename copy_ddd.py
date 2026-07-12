import os, random, shutil, pathlib, sys
def copy_random(src_dir, dst_dir, count, seed):
    random.seed(seed)
    src_path = pathlib.Path(src_dir)
    dst_path = pathlib.Path(dst_dir)
    dst_path.mkdir(parents=True, exist_ok=True)
    files = [f for f in src_path.iterdir() if f.is_file()]
    if len(files) < count:
        print(f'Warning: only {len(files)} files available in {src_dir}')
        count = len(files)
    selected = random.sample(files, count)
    for f in selected:
        shutil.copy2(f, dst_path / f.name)
base = pathlib.Path('C:/Users/Solange/Desktop/perceptAI')
non_drowsy_src = base / 'temp_datasets/driver_drowsiness/Driver Drowsiness Dataset (DDD)/Non Drowsy'
non_drowsy_dst = base / 'dataset/acordado'
drowsy_src = base / 'temp_datasets/driver_drowsiness/Driver Drowsiness Dataset (DDD)/Drowsy'
drowsy_dst = base / 'dataset/dormindo'
copy_random(non_drowsy_src, non_drowsy_dst, 300, 42)
copy_random(drowsy_src, drowsy_dst, 300, 43)
print('Copy completed')
