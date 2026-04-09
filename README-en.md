# Sentinel Sec Lab - Security Research Scenario Simulator

[**中文**](./README.md) | **English**

Interactive security research scenario demonstration platform, built with Next.js 15 + Tailwind CSS 4 + Framer Motion.

## Reference Framework

This project is extended from [Deep-Dive-Claude-Code](https://github.com/waiterxiaoyy/Deep-Dive-Claude-Code).

## Online Access

**URL**: https://bin4xin.github.io/sentinel-sec-lab/

## Project Structure

```
demo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles + Tailwind theme variables
│   │   ├── layout.tsx         # Root layout (ThemeProvider, LocaleProvider)
│   │   ├── page.tsx           # Main page (scenario selection + simulator)
│   │   └── not-found.tsx      # 404 page
│   │
│   ├── components/            # React components
│   │   ├── sidebar.tsx        # Sidebar (category list + theme toggle)
│   │   ├── agent-loop-simulator.tsx  # Simulator core component
│   │   ├── simulator-message.tsx      # Message display (with code highlighting)
│   │   ├── simulator-controls.tsx     # Playback controls
│   │   ├── theme-toggle.tsx          # Light/dark mode toggle button
│   │   └── theme-settings-menu.tsx    # Color scheme settings menu
│   │
│   ├── lib/                   # Utilities
│   │   ├── locale-context.tsx # Theme/Language Context Provider
│   │   ├── i18n.ts            # Internationalization text
│   │   └── utils.ts           # Utility functions
│   │
│   ├── types/                 # TypeScript types
│   │   └── agent-data.ts      # Scenario, SimStep, CodeBlock type definitions
│   │
│   ├── data/scenarios/        # JSON scenario data (source)
│   │   ├── ai-cli/
│   │   ├── ctf/
│   │   ├── cve/
│   │   └── ...
│   │
│   └── hooks/                 # React Hooks
│       └── useSimulator.ts
│
├── public/                    # Static assets (build output)
│   ├── data/
│   │   ├── scenarios-manifest.json  # Category list
│   │   └── scenarios/                 # Scenario JSON (copied from src during build)
│   └── assets/                # Images and other static assets
│
├── scripts/
│   └── generate-manifest.mjs  # Generate manifest and sync JSON to public
│
├── next.config.ts             # Next.js configuration
└── package.json
```

## JSON 404 Issue Analysis

### Problem

After deployment, accessing `https://bin4xin.github.io/sentinel-sec-lab/` returns `data/scenarios-manifest.json` 404 error.

### Root Cause Analysis

1. **basePath Configuration**: `next.config.ts` has `basePath: "/sentinel-sec-lab"`
   
2. **File Loading Path**: `src/app/page.tsx` uses absolute path:
   ```typescript
   fetch("/data/scenarios-manifest.json")
   ```
   
3. **Actual Request URL**: Browser requests `https://bin4xin.github.io/sentinel-sec-lab/data/scenarios-manifest.json`

4. **Build Output**: After `npm run build`, static files are in `out/data/` directory

### Deployment Checklist

```bash
# 1. Ensure public/data directory exists
ls public/data/

# 2. Run generate-manifest script
node scripts/generate-manifest.mjs

# 3. Build static export
npm run build

# 4. Check out/data directory
ls out/data/

# 5. Push to gh-pages
cd out
git init
git add .
git commit -m "Deploy to GitHub Pages"
git push -u origin gh-pages --force
```

### Common Issues

| Issue | Solution |
|-------|----------|
| 404 error | Confirm `out/data/scenarios-manifest.json` exists |
| Missing styles | Check if `basePath` matches repository name |
| Image 404 | Check `public/assets/` directory |

## Development

### Environment Requirements

- Node.js 18+
- npm 9+

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
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
# Ensure basePath configuration is correct (default: /sentinel-sec-lab)
# Check next.config.ts

npm run build
cd out
git init
git add .
git commit -m "Deploy"
git push -u origin gh-pages --force
```

## Features

- ✅ Light/Dark theme toggle
- ✅ Two color schemes (default/highlight)
- ✅ Follow system theme
- ✅ Chinese/English language toggle
- ✅ Code syntax highlighting (react-syntax-highlighter)
- ✅ Simulator playback controls
- ✅ 62+ security research scenarios

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS 4
- Framer Motion
- react-syntax-highlighter
- TypeScript

## License

MIT