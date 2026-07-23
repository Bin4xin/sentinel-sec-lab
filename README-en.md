<div align="center">

<!-- Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:F5F0E6,50:E8DDD0,100:DDDDDD&height=200&section=header&text=Sentinel%20Sec%20Lab&fontSize=38&fontColor=333333&fontAlignY=38&desc=Security%20Research%20Scenario%20Simulator&descSize=14&descAlignY=58&descColor=663399&animation=fadeIn" width="100%" />

<br>

**English** | [中文](./README.md)

</div>

<br>

<table align="center">
<tr>
<td width="55%">

### 📋 About

Interactive security research scenario demonstration platform built with **Next.js 15** + **Tailwind CSS 4** + **Framer Motion**. Features **62+** security research scenarios with playback controls, code highlighting, and i18n (Chinese/English).

> Extended from [Deep-Dive-Claude-Code](https://github.com/waiterxiaoyy/Deep-Dive-Claude-Code).

</td>
<td align="center" width="45%">

**🔗 Live Demo**

[![Visit](https://img.shields.io/badge/Live-Demo-3366CC?style=for-the-badge&logo=googlechrome&logoColor=white)](https://bin4xin.github.io/sentinel-sec-lab/)
<br>
<sub>https://bin4xin.github.io/sentinel-sec-lab/</sub>

</td>
</tr>
</table>

---

## ✨ Features

| Feature | Status |
|:---|:---:|
| Light / Dark theme toggle | ✅ |
| Two color schemes (default / highlight) | ✅ |
| Follow system theme | ✅ |
| Chinese / English language toggle | ✅ |
| Code syntax highlighting (react-syntax-highlighter) | ✅ |
| Simulator playback controls | ✅ |
| 62+ security research scenarios | ✅ |

---

## 🛠 Tech Stack

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

## 📁 Project Structure

```
sentinel-sec-lab/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── globals.css             # Global styles + Tailwind theme vars
│   │   ├── layout.tsx              # Root layout (ThemeProvider, LocaleProvider)
│   │   ├── page.tsx                # Main page (scenario selector + simulator)
│   │   └── not-found.tsx           # 404 page
│   │
│   ├── components/                 # React components
│   │   ├── sidebar.tsx             # Sidebar (category list + theme toggle)
│   │   ├── agent-loop-simulator.tsx # Core simulator component
│   │   ├── simulator-message.tsx    # Message display (with code highlighting)
│   │   ├── simulator-controls.tsx   # Playback controls
│   │   ├── theme-toggle.tsx        # Light / Dark mode toggle
│   │   └── theme-settings-menu.tsx  # Color scheme settings menu
│   │
│   ├── lib/                        # Utilities
│   │   ├── locale-context.tsx      # Theme / Language Context Provider
│   │   ├── i18n.ts                 # Internationalization strings
│   │   └── utils.ts                # Utility functions
│   │
│   ├── types/                      # TypeScript type definitions
│   │   └── agent-data.ts           # Scenario, SimStep, CodeBlock types
│   │
│   ├── data/scenarios/             # JSON scenario data (source)
│   │   ├── ai-cli/
│   │   ├── ctf/
│   │   ├── cve/
│   │   └── ...
│   │
│   └── hooks/                      # React Hooks
│       └── useSimulator.ts
│
├── public/                         # Static assets (build output)
│   ├── data/
│   │   ├── scenarios-manifest.json # Category manifest
│   │   └── scenarios/              # Scenario JSON files
│   └── assets/                     # Images and static resources
│
├── scripts/
│   └── generate-manifest.mjs       # Generate manifest & sync JSON to public
│
├── next.config.ts
└── package.json
```

---

## 🚀 Development

### Prerequisites

- Node.js **18+**
- npm **9+**

### Install & Run

```bash
# Install dependencies
npm install

# Development mode
npm run dev
```

Visit http://localhost:3201

### Build

```bash
# Generate manifest + build
node scripts/generate-manifest.mjs
npm run build
```

### Deploy to GitHub Pages

```bash
# Ensure basePath is correct (default: /sentinel-sec-lab)
npm run build

cd out
git init
git add .
git commit -m "Deploy"
git push -u origin gh-pages --force
```

---

## 🔧 JSON 404 Troubleshooting

If you encounter a `scenarios-manifest.json` 404 error after deploying to `https://bin4xin.github.io/sentinel-sec-lab/`:

**Root cause**: `next.config.ts` sets `basePath: "/sentinel-sec-lab"`, so the browser requests `/sentinel-sec-lab/data/scenarios-manifest.json`.

**Checklist**:

```bash
ls public/data/                    # 1. Ensure public/data exists
node scripts/generate-manifest.mjs # 2. Run manifest script
npm run build                      # 3. Build
ls out/data/                       # 4. Verify out/data
```

| Issue | Solution |
|:---|:---|
| 404 error | Confirm `out/data/scenarios-manifest.json` exists |
| Missing styles | Check if `basePath` matches repository name |
| Image 404 | Check `public/assets/` directory |

---

## 📄 License

[MIT](https://github.com/Bin4xin/sentinel-sec-lab/blob/master/LICENSE)

<div align="center">

<sub>© 2026 Bin4xin · <a href="https://bin4xin.github.io/">Sentinel Sec Lab</a></sub>

</div>