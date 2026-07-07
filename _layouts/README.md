# _layouts 模板覆盖说明

本目录用于覆盖 Honkit（GitBook 继承者）默认主题的页面模板。

## 当前状态：未启用模板覆盖（为保证 `honkit build` 必过）

- 本目录下的 [`website/page.html.example`](website/page.html.example) 是一个**未生效**的示例模板，
  Honkit 不会加载它（文件名不是主题模板名，因此不进入模板解析链）。
- 它预埋了将来可能需要的：
  - SEO meta（description / keywords / og:*）
  - Google Analytics 脚本占位（注释包裹，未启用）
  - Google AdSense 脚本占位（注释包裹，未启用）

## 为什么不直接启用 `page.html`

在当前环境（Honkit 6.x + nunjucks 3.2.4 + Node 22）下，一旦放置生效的
`_layouts/website/page.html` 覆盖主题模板，会触发主题自带 `page.html` 内部的
`{% extends "./layout.html" %}` 相对路径被错误解析到**本书目录**而非**主题目录**，
导致 `template not found: layout.html` 构建失败；若改用 `{% extends template.self %}`
则会递归栈溢出。

因此按“构建必过优先”的原则，暂不启用模板覆盖，改以 `.example` 形式保留参考。

## 启用建议

1. 升级 / 更换 Honkit 版本，确认主题 `page.html` 的相对 `extends` 能正确解析；
2. 或改用支持 `head` 注入的 Honkit 插件（如广告 / 统计类插件）；
3. 或在部署产物 `_book/` 上做 HTML 后处理注入。

启用模板覆盖前，请务必本地 `npm run build` 验证通过后再提交。

> 另外提醒：`book.json` 的 `plugins` 字段**不要重复列出** `highlight`、`search`、
> `fontsettings`、`lunr` 等 Honkit 默认插件，重复会导致模板搜索路径重复、
> `self` 继承递归，从而构建失败。
