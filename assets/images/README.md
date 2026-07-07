# 配图资源目录

本目录用于存放本书各章节的配图。

## 命名与放置规则

- 所有配图的**生图提示词**写在各章节的 Markdown 文件中（通常放在 `>` 引用块内）。
- 图片生成后，按**章节编号**命名并放入本目录，例如：
  - `ch01-what-is-ai-01.png`
  - `ch18-transformer-arch.png`
- 在 Markdown 中一律使用**相对路径**引用，例如：

  ```markdown
  ![Transformer 架构示意图](../assets/images/ch18-transformer-arch.png)
  ```

## 说明

- 文件名使用小写英文 + 连字符。
- 建议统一使用 PNG 或 SVG 格式，保证清晰度与可缩放性。
