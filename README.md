<div align="center">

<!-- Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:F5F0E6,50:E8DDD0,100:DDDDDD&height=200&section=header&text=Sentinel%20Sec%20Lab&fontSize=38&fontColor=333333&fontAlignY=38&desc=安全研究场景模拟器%20%7C%20Security%20Research%20Scenario%20Simulator&descSize=14&descAlignY=58&descColor=663399&animation=fadeIn" width="100%" />

<br>

[English](./README-en.md) | **中文**

</div>

<br>

<table align="center">
<tr>
<td width="55%">

### 📋 关于

交互式安全研究场景演示平台，基于 **Next.js 15** + **Tailwind CSS 4** + **Framer Motion** 构建。涵盖 **62+** 安全研究场景，支持播放控制、代码高亮、中英文切换。

> 本项目基于 [Deep-Dive-Claude-Code](https://github.com/waiterxiaoyy/Deep-Dive-Claude-Code) 扩展开发。

</td>
<td align="center" width="45%">

**🔗 在线访问**

[![Visit](https://img.shields.io/badge/Live-Demo-3366CC?style=for-the-badge&logo=googlechrome&logoColor=white)](https://bin4xin.github.io/sentinel-sec-lab/)
<br>
<sub>https://bin4xin.github.io/sentinel-sec-lab/</sub>

</td>
</tr>
</table>

---

## ✨ 功能特性

| 特性 | 状态 |
|:---|:---:|
| 亮/暗主题切换 | ✅ |
| 两种配色方案（默认/高亮） | ✅ |
| 跟随系统主题 | ✅ |
| 中英文切换 | ✅ |
| 代码语法高亮（react-syntax-highlighter） | ✅ |
| 模拟器播放控制 | ✅ |
| 62+ 安全研究场景 | ✅ |

---

## 🛠 技术栈

<table>
<tr>
<td align="center" width="20%">
<a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/></a>
</td>
<td align="center" width="20%">
<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/></a>
</td>
<td align="center" width="20%">
<a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"/></a>
</td>
<td align="center" width="20%">
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/></a>
</td>
</tr>
</table>

---

## 📁 项目结构

```
sentinel-sec-lab/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── globals.css             # 全局样式 + Tailwind 主题变量
│   │   ├── layout.tsx              # 根布局 (ThemeProvider, LocaleProvider)
│   │   ├── page.tsx                # 主页面 (场景选择 + 模拟器)
│   │   └── not-found.tsx           # 404 页面
│   │
│   ├── components/                 # React 组件
│   │   ├── sidebar.tsx             # 侧边栏 (分类列表 + 主题切换)
│   │   ├── agent-loop-simulator.tsx # 模拟器核心组件
│   │   ├── simulator-message.tsx    # 消息展示 (含代码高亮)
│   │   ├── simulator-controls.tsx   # 播放控制
│   │   ├── theme-toggle.tsx        # 亮/暗模式切换
│   │   └── theme-settings-menu.tsx  # 配色方案设置菜单
│   │
│   ├── lib/                        # 工具库
│   │   ├── locale-context.tsx      # 主题/语言 Context Provider
│   │   ├── i18n.ts                 # 国际化文本
│   │   └── utils.ts                # 工具函数
│   │
│   ├── types/                      # TypeScript 类型定义
│   │   └── agent-data.ts           # Scenario, SimStep, CodeBlock
│   │
│   ├── data/scenarios/             # JSON 场景数据 (源码)
│   │   ├── ai-cli/
│   │   ├── ctf/
│   │   ├── cve/
│   │   └── ...
│   │
│   └── hooks/                      # React Hooks
│       └── useSimulator.ts
│
├── public/                         # 静态资源
│   ├── data/
│   │   ├── scenarios-manifest.json # 分类清单
│   │   └── scenarios/              # 场景 JSON
│   └── assets/                     # 图片等静态资源
│
├── scripts/
│   └── generate-manifest.mjs       # 生成 manifest 和同步 JSON 到 public
│
├── next.config.ts
└── package.json
```

---

## 🚀 开发

### 环境要求

- Node.js **18+**
- npm **9+**

### 安装 & 运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev
```

访问 http://localhost:3201

### 构建

```bash
# 生成 manifest + 构建
node scripts/generate-manifest.mjs
npm run build
```

### 部署到 GitHub Pages

```bash
# 确保 basePath 配置正确 (默认: /sentinel-sec-lab)
npm run build

cd out
git init
git add .
git commit -m "Deploy"
git push -u origin gh-pages --force
```

---

## 🔧 JSON 404 问题排查

部署后访问 `https://bin4xin.github.io/sentinel-sec-lab/` 时如遇 `scenarios-manifest.json` 404 错误：

**根因**：`next.config.ts` 中 `basePath: "/sentinel-sec-lab"`，浏览器实际请求路径为 `/sentinel-sec-lab/data/scenarios-manifest.json`。

**检查清单**：

```bash
ls public/data/                    # 1. 确保 public/data 存在
node scripts/generate-manifest.mjs # 2. 运行 manifest 脚本
npm run build                      # 3. 构建
ls out/data/                       # 4. 检查 out/data
```

| 问题 | 解决方案 |
|:---|:---|
| 404 错误 | 确认 `out/data/scenarios-manifest.json` 存在 |
| 样式丢失 | 检查 `basePath` 是否与仓库名匹配 |
| 图片 404 | 检查 `public/assets/` 目录 |

---

## 📄 License

[MIT](https://github.com/Bin4xin/sentinel-sec-lab/blob/master/LICENSE)

<div align="center">

<sub>© 2026 Bin4xin · <a href="https://bin4xin.github.io/">Sentinel Sec Lab</a></sub>

</div>