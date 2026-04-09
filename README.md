# Sentinel Sec Lab - 安全研究场景模拟器

交互式安全研究场景演示平台，基于 Next.js 15 + Tailwind CSS 4 + Framer Motion 构建。

## 在线访问

**访问地址**: https://bin4xin.github.io/sentinel-sec-lab/

## 项目结构

```
demo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # 全局样式 + Tailwind 主题变量
│   │   ├── layout.tsx         # 根布局 (ThemeProvider, LocaleProvider)
│   │   ├── page.tsx           # 主页面 (场景选择 + 模拟器)
│   │   └── not-found.tsx      # 404 页面
│   │
│   ├── components/            # React 组件
│   │   ├── sidebar.tsx        # 侧边栏 (分类列表 + 主题切换)
│   │   ├── agent-loop-simulator.tsx  # 模拟器核心组件
│   │   ├── simulator-message.tsx      # 消息展示 (含代码高亮)
│   │   ├── simulator-controls.tsx     # 播放控制
│   │   ├── theme-toggle.tsx          # 亮/暗模式切换按钮
│   │   └── theme-settings-menu.tsx    # 配色方案设置菜单
│   │
│   ├── lib/                   # 工具库
│   │   ├── locale-context.tsx # 主题/语言 Context Provider
│   │   ├── i18n.ts            # 国际化文本
│   │   └── utils.ts           # 工具函数
│   │
│   ├── types/                 # TypeScript 类型
│   │   └── agent-data.ts      # Scenario, SimStep, CodeBlock 类型定义
│   │
│   ├── data/scenarios/        # JSON 场景数据 (源码)
│   │   ├── ai-cli/
│   │   ├── ctf/
│   │   ├── cve/
│   │   └── ...
│   │
│   └── hooks/                 # React Hooks
│       └── useSimulator.ts
│
├── public/                    # 静态资源 (构建输出)
│   ├── data/
│   │   ├── scenarios-manifest.json  # 分类清单
│   │   └── scenarios/                 # 场景 JSON (构建时从 src 复制)
│   └── assets/                # 图片等静态资源
│
├── scripts/
│   └── generate-manifest.mjs  # 生成 manifest 和同步 JSON 到 public
│
├── next.config.ts             # Next.js 配置
└── package.json
```

## JSON 404 问题分析

### 问题原因

部署后访问 `https://bin4xin.github.io/sentinel-sec-lab/` 时，返回 `data/scenarios-manifest.json` 404 错误。

### 原因分析

1. **basePath 配置**: `next.config.ts` 中设置了 `basePath: "/sentinel-sec-lab"`
   
2. **文件加载路径**: `src/app/page.tsx` 中使用绝对路径：
   ```typescript
   fetch("/data/scenarios-manifest.json")
   ```
   
3. **实际请求 URL**: 浏览器请求 `https://bin4xin.github.io/sentinel-sec-lab/data/scenarios-manifest.json`

4. **构建输出**: `npm run build` 后，静态文件位于 `out/data/` 目录

### 部署检查清单

```bash
# 1. 确保 public/data 目录存在
ls public/data/

# 2. 运行 generate-manifest 脚本
node scripts/generate-manifest.mjs

# 3. 构建静态导出
npm run build

# 4. 检查 out/data 目录
ls out/data/

# 5. 推送到 gh-pages
cd out
git init
git add .
git commit -m "Deploy to GitHub Pages"
git push -u origin gh-pages --force
```

### 常见问题

| 问题 | 解决方案 |
|------|----------|
| 404 错误 | 确认 `out/data/scenarios-manifest.json` 存在 |
| 样式丢失 | 检查 `basePath` 是否与仓库名匹配 |
| 图片404 | 检查 `public/assets/` 目录 |

## 开发

### 环境要求

- Node.js 18+
- npm 9+

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
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
# 确保 basePath 配置正确 (默认为 /sentinel-sec-lab)
# 查看 next.config.ts

npm run build
cd out
git init
git add .
git commit -m "Deploy"
git push -u origin gh-pages --force
```

## 功能特性

- ✅ 亮/暗主题切换
- ✅ 两种配色方案 (默认/高亮)
- ✅ 跟随系统主题
- ✅ 中英文切换
- ✅ 代码语法高亮 (react-syntax-highlighter)
- ✅ 模拟器播放控制
- ✅ 62+ 安全研究场景

## 技术栈

- Next.js 15 (App Router)
- Tailwind CSS 4
- Framer Motion
- react-syntax-highlighter
- TypeScript

## License

MIT