---
layout: default-layout
title: 隐藏页面
---

# 🏛️ 罗马维基 · 固定布局

**标题栏** 和 **侧边栏** 在正文滚动时始终固定在屏幕上方和左侧。配色灵感源自 **罗马帝国**：红棕、莎草纸、羊皮卷与青铜色。

<div class="wiki-meta">
📌 本页面演示了罗马风格的固定布局。侧边栏和标题栏均不会随正文滚动。
<span style="display: inline-block; margin-left: 12px; background: #8b2f1c; color: #f5e6c4; padding: 0 14px; border-radius: 30px; font-size: 0.8rem; border: 1px solid #b78a5c;">⚔️ 罗马配色</span>
</div>

<div class="toc">
<strong>📑 目录</strong>
<ul>
  <li><a href="#section1" style="text-decoration: none; color: #5a2f1a; border-bottom: 1px dotted #b78a5c;">1. 实现原理</a></li>
  <li><a href="#section2" style="text-decoration: none; color: #5a2f1a; border-bottom: 1px dotted #b78a5c;">2. 内容填充</a></li>
  <li><a href="#section3" style="text-decoration: none; color: #5a2f1a; border-bottom: 1px dotted #b78a5c;">3. 响应式适配</a></li>
</ul>
</div>

<div id="section1" />
## 1. 实现原理

使用 `display: grid` 将页面划分为 **标题栏 (跨两列)**、**侧边栏 (第一列)** 和 **正文 (第二列)**。整个容器高度固定为 `100vh`，并设置 `overflow: hidden`，仅让 `.main-content` 区域滚动。

<div class="blockquote-wiki">
“元老院与罗马人民 (SPQR) 的智慧 —— 标题栏和侧边栏始终稳固，正文如羊皮卷般缓缓展开。”
</div>

<div id="section2" />
## 2. 内容填充

以下是一段模拟的罗马维基正文，包含标题、段落、列表和引用，以便观察滚动时标题栏和侧边栏的固定效果。

### 2.1 历史背景

罗马维基（Roman Wiki）概念源自古代元老院的记录传统。作为一种协作式知识平台，它允许公民通过羊皮卷自由编辑条目。

- **公元前753年** — 罗马建城
- **公元前509年** — 罗马共和国成立
- **公元前27年** — 罗马帝国建立

<div id="section3" />
## 3. 响应式适配

通过媒体查询 `@media (max-width: 780px)`，侧边栏被隐藏，正文区域占满整列。

<p style="margin-top: 24px; color: #5a3f2a;">
<span style="background: #dac8b0; padding: 2px 16px; border-radius: 30px; border: 1px solid #b78a5c;">⏳ 滚动到底部，标题栏和侧边栏依然固定</span>
</p>

<p style="text-align: right; font-size: 0.85rem; color: #7a5f4a; font-style: italic;">— SPQR · 页面底部 —</p>