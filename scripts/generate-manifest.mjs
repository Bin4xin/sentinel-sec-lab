/**
 * scripts/generate-manifest.mjs
 *
 * 扫描 src/data/scenarios 目录，生成：
 * 1. public/data/scenarios-manifest.json - 分类和文件列表
 * 2. 复制所有 JSON 文件到 public/data/scenarios/
 *
 * 运行方式：
 *   node scripts/generate-manifest.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_SCENARIOS = path.join(ROOT, "src", "data", "scenarios");
const PUBLIC_SCENARIOS = path.join(ROOT, "public", "data", "scenarios");
const MANIFEST_PATH = path.join(ROOT, "public", "data", "scenarios-manifest.json");

async function main() {
  console.log("🔍 Scanning scenarios...\n");

  // 确保目录存在
  fs.mkdirSync(PUBLIC_SCENARIOS, { recursive: true });

  // 读取所有分类目录
  const categories = [];
  const dirs = fs.readdirSync(SRC_SCENARIOS, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const dir of dirs) {
    const srcDir = path.join(SRC_SCENARIOS, dir);
    const destDir = path.join(PUBLIC_SCENARIOS, dir);

    // 创建目标目录
    fs.mkdirSync(destDir, { recursive: true });

    // 读取该分类下的所有 JSON 文件
    const files = fs.readdirSync(srcDir)
      .filter((f) => f.endsWith(".json"))
      .sort();

    // 尝试读取第一个文件获取分类描述
    let description = "";
    if (files.length > 0) {
      try {
        const firstFile = path.join(srcDir, files[0]);
        const content = JSON.parse(fs.readFileSync(firstFile, "utf-8"));
        // 从 version 字段推断分类名
        description = `Category: ${dir}`;
      } catch {
        // ignore
      }
    }

    categories.push({
      id: dir,
      name: formatCategoryName(dir),
      description,
      files,
    });

    // 复制文件
    for (const file of files) {
      const src = path.join(srcDir, file);
      const dest = path.join(destDir, file);
      fs.copyFileSync(src, dest);
    }

    console.log(`  ✅ ${dir}: ${files.length} files`);
  }

  // 写入 manifest
  const manifest = { categories };
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");

  console.log(`\n✨ Generated manifest: ${MANIFEST_PATH}`);
  console.log(`📦 Total categories: ${categories.length}\n`);
}

function formatCategoryName(id) {
  // kebab-case → Title Case
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
