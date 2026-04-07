"use client";

import { Sun, Moon, ChevronRight, Globe } from "lucide-react";
import { useTheme, useLocale } from "@/lib/locale-context";
import { UI_TEXT } from "@/lib/i18n";

interface Category {
  id: string;
  name: string;
  description: string;
  files: string[];
}

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  scenarioCount: number;
}

export function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  scenarioCount,
}: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const t = UI_TEXT[locale];

  const toggleLocale = () => {
    setLocale(locale === "zh" ? "en" : "zh");
  };

  // 直接用 theme 变量选择图片，不依赖 CSS dark: class
  const logoSrc = theme === "dark" 
    ? "/img/pics/logo-small-dark.png"
    : "/img/pics/logo-small.svg";

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-[var(--card-border)] bg-[var(--card-bg)]">
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-[var(--card-border)] px-4">
        <div className="flex items-center gap-3">
          <img 
            src={logoSrc}
            alt="Sentinel Sec" 
            className="h-6 w-auto object-contain"
          />
          <h1 className="text-base font-semibold">Sentinel Sec</h1>
        </div>
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--background)]"
          title={theme === "dark" ? t.light_mode : t.dark_mode}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={toggleLocale}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--background)]"
          title={locale === "zh" ? "Switch to English" : "切换到中文"}
        >
          <Globe size={16} />
          <span className="ml-1 text-xs font-medium">{locale.toUpperCase()}</span>
        </button>
      </div>

      {/* 分类列表 */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          分类 ({categories.length})
        </div>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors ${
                  isSelected
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "hover:bg-[var(--background)]"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{cat.name}</div>
                  <div
                    className={`truncate text-xs ${
                      isSelected
                        ? "text-[var(--background)]/70"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {cat.files.length} 个场景
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className={`shrink-0 transition-transform ${
                    isSelected ? "rotate-90" : ""
                  }`}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--card-border)] p-3">
        <div className="text-xs text-[var(--text-muted)]">
          共 {scenarioCount} 个场景
        </div>
      </div>
    </aside>
  );
}
