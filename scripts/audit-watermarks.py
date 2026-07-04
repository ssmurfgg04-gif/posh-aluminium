#!/usr/bin/env python3
"""Download all sfile.chatglm.cn images and check for watermarks via VLM."""
import subprocess
import json
import os
import concurrent.futures

IMAGES = [
    "0024c6d74d40.jpg", "08ccf4dc4131.jpg", "16b7bf54028c.jpg",
    "16c0f2275b34.jpg", "2312697e1bf1.jpg", "2409dae87492.jpg",
    "25f9037b1dab.jpg", "2923585a1383.jpg", "2d721fa2ae3f.jpg",
    "3798af9c6489.jpg", "48db90ca7854.jpg", "4dadad11568d.jpg",
    "5f39f7695409.jpg", "6a06cefd6137.jpg", "7c5d190eeeb0.jpg",
    "7e42ed57f175.jpg", "88d97ce59786.jpg", "8fb05022dd78.jpg",
    "9c98b45a3629.jpg", "b224852c803a.png", "b58aaa3097a1.jpg",
    "be97eb1927e8.jpg", "c2a22867029d.jpg", "d0e13f2c2f9e.jpg",
    "d58f925cbb33.jpg", "d8c2d7a22cf1.jpg", "d93b8e9a44c3.jpg",
    "ff11f824e171.jpg", "52795de92048.jpg", "dc59cdc0d708.jpg",
    "c5bec2271c40.jpg", "17c9d9058921.jpg",
]

BASE = "https://sfile.chatglm.cn/images-ppt"
OUT = "/tmp/img-audit"
os.makedirs(OUT, exist_ok=True)

def check_image(img_id):
    path = f"{OUT}/{img_id}"
    url = f"{BASE}/{img_id}"
    
    # Download if not already cached
    if not os.path.exists(path):
        subprocess.run(["curl", "-s", "-o", path, url], timeout=30, check=False)
    
    if not os.path.exists(path) or os.path.getsize(path) < 1000:
        return img_id, "DOWNLOAD_FAILED"
    
    # Check with VLM
    try:
        result = subprocess.run(
            ["z-ai", "vision", "-p",
             "Does this image have any watermarks, stock photo site logos (Alamy, Shutterstock, Getty, iStock, etc), or text overlays? Answer ONLY 'CLEAN' or 'WATERMARKED: <site name>'. 10 words max.",
             "-i", path],
            capture_output=True, text=True, timeout=60
        )
        output = result.stdout + result.stderr
        # Extract the content
        if "CLEAN" in output and "WATERMARKED" not in output:
            return img_id, "CLEAN"
        elif "WATERMARKED" in output:
            # Extract site name
            for line in output.split("\n"):
                if "WATERMARKED" in line:
                    return img_id, line.strip()
            return img_id, "WATERMARKED"
        else:
            return img_id, "UNCLEAR: " + output[:100]
    except Exception as e:
        return img_id, f"ERROR: {e}"

# Check all images in parallel (3 at a time to avoid rate limits)
results = {}
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
    futures = {executor.submit(check_image, img): img for img in IMAGES}
    for future in concurrent.futures.as_completed(futures):
        img_id, status = future.result()
        results[img_id] = status
        marker = "❌" if "WATERMARK" in status else "✓" if status == "CLEAN" else "?"
        print(f"  {marker} {img_id}: {status}")

print("\n=== SUMMARY ===")
watermarked = {k: v for k, v in results.items() if "WATERMARK" in v}
clean = {k: v for k, v in results.items() if v == "CLEAN"}
other = {k: v for k, v in results.items() if v not in watermarked and v != "CLEAN"}
print(f"  Clean: {len(clean)}")
print(f"  Watermarked: {len(watermarked)}")
print(f"  Other: {len(other)}")
if watermarked:
    print("\nWATERMARKED IMAGES TO REPLACE:")
    for k, v in watermarked.items():
        print(f"  {k}: {v}")
