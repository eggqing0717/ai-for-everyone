"""
批量生成书籍插画脚本
使用硅基流动 (SiliconFlow) API + Kwai-Kolors/Kolors 模型
"""

import re
import os
import time
import requests

# ============ 配置 ============
API_URL = "https://api.siliconflow.cn/v1/images/generations"
API_KEY = "sk-btxvsbwtmdpzinqyybchqvnqgwjsthdnestzuftfqzookmaw"
MODEL = "Kwai-Kolors/Kolors"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "zh", "assets", "images")
PROMPT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "配图提示词清单.md")
DELAY_SECONDS = 2  # 每次请求间隔

# 需要 1:1 比例的图片（热力图等方形图）
SQUARE_IMAGES = {"ch18-attention-heatmap.png"}

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}


def parse_prompts(filepath):
    """从 Markdown 文件中解析所有图片的序号、文件名和提示词"""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 匹配表格行: | 序号 | `filename.png` | alt | prompt |
    pattern = r'\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*([^|]+)\|\s*([^|]+)\|'
    matches = re.findall(pattern, content)

    images = []
    for match in matches:
        seq = int(match[0])
        filename = match[1].strip()
        alt = match[2].strip()
        prompt = match[3].strip()
        images.append({
            "seq": seq,
            "filename": filename,
            "alt": alt,
            "prompt": prompt
        })

    return images


def generate_image(prompt, image_size="1024x576"):
    """调用 SiliconFlow API 生成图片，返回图片 URL"""
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "image_size": image_size,
        "batch_size": 1,
        "num_inference_steps": 25,
        "guidance_scale": 7.5
    }

    response = requests.post(API_URL, json=payload, headers=HEADERS, timeout=120)

    if response.status_code != 200:
        raise Exception(f"API 返回错误 {response.status_code}: {response.text}")

    data = response.json()
    if "images" in data and len(data["images"]) > 0:
        return data["images"][0]["url"]
    else:
        raise Exception(f"API 响应格式异常: {data}")


def download_image(url, save_path):
    """下载图片并保存到本地"""
    response = requests.get(url, timeout=60)
    if response.status_code != 200:
        raise Exception(f"下载图片失败，状态码: {response.status_code}")

    with open(save_path, "wb") as f:
        f.write(response.content)


def main(start_from=1, end_at=None):
    """
    主函数：批量生成图片
    start_from: 从第几张开始（含），默认1
    end_at: 到第几张结束（含），默认全部
    """
    # 确保输出目录存在
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # 解析提示词
    images = parse_prompts(PROMPT_FILE)
    print(f"✓ 共解析到 {len(images)} 张图片的提示词")

    if end_at is None:
        end_at = len(images)

    # 筛选范围
    to_generate = [img for img in images if start_from <= img["seq"] <= end_at]
    print(f"✓ 本次计划生成: 第 {start_from} 张 ~ 第 {end_at} 张，共 {len(to_generate)} 张\n")

    success_count = 0
    skip_count = 0
    fail_count = 0

    for img in to_generate:
        save_path = os.path.join(OUTPUT_DIR, img["filename"])

        # 断点续传：跳过已存在的图片
        if os.path.exists(save_path) and os.path.getsize(save_path) > 0:
            print(f"[{img['seq']:02d}/{end_at}] ⏭ 跳过（已存在）: {img['filename']}")
            skip_count += 1
            continue

        # 确定图片尺寸
        image_size = "1024x1024" if img["filename"] in SQUARE_IMAGES else "1024x576"

        print(f"[{img['seq']:02d}/{end_at}] 🎨 生成中: {img['filename']} ({image_size})")
        print(f"           提示词: {img['prompt'][:60]}...")

        try:
            # 调用 API 生成
            image_url = generate_image(img["prompt"], image_size)
            print(f"           ✓ 图片已生成，正在下载...")

            # 下载图片
            download_image(image_url, save_path)
            file_size = os.path.getsize(save_path)
            print(f"           ✓ 已保存: {save_path} ({file_size / 1024:.1f} KB)")
            success_count += 1

        except Exception as e:
            print(f"           ✗ 失败: {e}")
            fail_count += 1

        # 请求间隔
        if img != to_generate[-1]:
            print(f"           ⏳ 等待 {DELAY_SECONDS} 秒...")
            time.sleep(DELAY_SECONDS)

        print()

    # 汇总
    print("=" * 50)
    print(f"生成完毕！成功: {success_count} | 跳过: {skip_count} | 失败: {fail_count}")
    print(f"图片保存目录: {OUTPUT_DIR}")


if __name__ == "__main__":
    import sys

    # 支持命令行参数: python generate_images.py [start] [end]
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    end = int(sys.argv[2]) if len(sys.argv) > 2 else None

    main(start_from=start, end_at=end)
