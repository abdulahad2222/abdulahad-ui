from PIL import Image
import os

images_to_optimize = [
    ('ahad_1.webp', 1600, 85),
    ('ahad_2.webp', 1600, 85),
    ('ahad_3.webp', 1600, 85),
    ('isbmuniversity.webp', 1280, 85),
]

for name, max_w, q in images_to_optimize:
    path = os.path.join('public', 'image', name)
    if os.path.exists(path):
        img = Image.open(path)
        if img.width > max_w:
            h = int(img.height * (max_w / img.width))
            img = img.resize((max_w, h), Image.Resampling.LANCZOS)
        img.save(path, 'WEBP', quality=q, method=6)
        print(f"Optimized {name}: {os.path.getsize(path)/1024:.1f} KB")

# Also remove intermediate temporary files that are not referenced in code
temps = ['ahad_1.jpg', 'ahad_2.jpg', 'ahad_2_cropped.jpg', 'ahad_2_cropped.webp', 'ahad_3.jpg', 'ahad.webp', 'Ahad.heic', 'Ahad (2).heic', 'Ahad (3).heic']
for t in temps:
    p = os.path.join('public', 'image', t)
    if os.path.exists(p):
        os.remove(p)
        print(f"Removed temporary {t}")

cvcv = os.path.join('public', 'docs', 'cvcv.pdf')
if os.path.exists(cvcv):
    os.remove(cvcv)
    print("Removed cvcv.pdf")
