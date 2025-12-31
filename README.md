# Team Conrad — 示例单页模板

这是为Conrad比赛准备的示例单页模板（占位图、示例文案）。包含以下文件：

- index.html — 页面主文件
- styles.css — 样式
- script.js — 小交互（平滑滚动）

快速预览（在本地）：

```bash
# 进入项目文件夹
cd "康莱德网站"


# 在 macOS 或 Linux 上用 Python 内置服务器预览
python3 -m http.server 8000
# 然后在浏览器打开 http://localhost:8000
```

部署建议：
- 使用 Netlify、Vercel 或 GitHub Pages 上传此仓库并发布，方便提供公开链接给评委。
- 如果你不希望搜索引擎收录，在 `index.html` 的 `<head>` 中取消注释 `meta name="robots" content="noindex,nofollow"`。

下一步（我可以帮你做）：
- 把你们的真实 Logo、队名与设计截图替换进 `index.html`。
- 我可以把页面部署到 Netlify 并给你公开链接（需你授权或创建账号）。
