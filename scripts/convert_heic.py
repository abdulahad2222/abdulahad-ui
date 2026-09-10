import os
from PIL import Image
import pillow_heif

pillow_heif.register_heif_opener()

img_dir = "public/image"
files = [
    ("Ahad.heic", "ahad_1.webp", "ahad_1.jpg"),
    ("Ahad (2).heic", "ahad_2.webp", "ahad_2.jpg"),
    ("Ahad (3).heic", "ahad_3.webp", "ahad_3.jpg"),
]

for src, webp_out, jpg_out in files:
    src_path = os.path.join(img_dir, src)
    if os.path.exists(src_path):
        try:
            img = Image.open(src_path)
            img.save(os.path.join(img_dir, webp_out), "WEBP", quality=90)
            img.convert("RGB").save(os.path.join(img_dir, jpg_out), "JPEG", quality=90)
            print(f"Successfully converted {src} -> {webp_out} and {jpg_out}, size: {img.size}")
        except Exception as e:
            print(f"Error converting {src}: {e}")
    else:
        print(f"Source file not found: {src_path}")
