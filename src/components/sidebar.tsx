"use client";

import { ChevronRight, Globe } from "lucide-react";
import { useTheme, useLocale } from "@/lib/locale-context";
import { UI_TEXT } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";
import { ThemeSettingsMenu } from "./theme-settings-menu";

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
  const { themeMode, colorScheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const t = UI_TEXT[locale];

  const toggleLocale = () => {
    setLocale(locale === "zh" ? "en" : "zh");
  };

  // 根据主题模式选择 Logo
  const logoSrc = themeMode === "dark"
      ? "/assets/img/logo-small-dark.png"
      : "/assets/img/logo-small.svg";

  // 判断是否为高亮配色方案
  const isHighlight = colorScheme === "highlight";

  // 动态国际化文案
  const categoriesLabel = t.sidebar.categories(categories.length);
  const totalScenariosLabel = t.sidebar.totalScenarios(scenarioCount);
  const languageHint = t.sidebar.languageSwitchHint;

  return (
      <aside
          className="sidebar flex h-full w-64 shrink-0 flex-col border-r sidebar-border"
          style={{ background: "var(--sidebar-bg)" }}
      >
        {/* 头部 */}
        <div
            className="flex h-14 items-center justify-between border-b px-4"
            style={{ borderColor: "var(--sidebar-border)" }}
        >
          <div className="flex items-center gap-3">
            <img
                src={logoSrc}
                alt="Sentinel Sec"
                className="h-6 w-auto object-contain"
            />
            <h1
                className="text-base font-semibold"
                style={{ color: "var(--sidebar-text)" }}
            >
              Sentinel Sec
            </h1>
          </div>

          {/* 语言切换按钮 */}
          <button
              onClick={toggleLocale}
              className="flex h-8 w-12 items-center justify-center rounded-lg transition-colors hover:opacity-80"
              style={{
                background: "var(--sidebar-border)",
                color: "var(--sidebar-text)"
              }}
              title={languageHint}
          >
            <Globe size={16} />
            <span className="ml-1 text-xs font-medium">{locale.toUpperCase()}</span>
          </button>
        </div>

        {/* 分类列表 */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div
              className="mb-2 px-2 text-xs font-medium uppercase tracking-wider"
              style={{ color: "var(--sidebar-muted)" }}
          >
            {categoriesLabel}
          </div>
          <div className="space-y-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                  <button
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all duration-150 ${
                          isSelected
                              ? isHighlight
                                  ? "accent-bg accent-border border"
                                  : "bg-[var(--primary)] text-white"
                              : "hover:bg-[var(--sidebar-border)]"
                      }`}
                      style={!isSelected ? { color: "var(--sidebar-text)" } : {}}
                  >
                    <div className="min-w-0 flex-1">
                      <div
                          className="truncate text-sm font-medium"
                          style={isSelected && isHighlight ? { color: "var(--accent)" } : {}}
                      >
                        {cat.name}
                      </div>
                      <div
                          className={`truncate text-xs ${
                              isSelected && !isHighlight ? "text-white/70" : ""
                          }`}
                          style={!isSelected || isHighlight ? { color: "var(--sidebar-muted)" } : {}}
                      >
                        {t.sidebar.scenariosCount(cat.files.length)}
                      </div>
                    </div>
                    <ChevronRight
                        size={16}
                        className={`shrink-0 transition-transform ${
                            isSelected ? "rotate-90" : ""
                        }`}
                        style={{
                          color: isSelected
                              ? isHighlight
                                  ? "var(--accent)"
                                  : "white"
                              : "var(--sidebar-muted)"
                        }}
                    />
                  </button>
              );
            })}
          </div>
        </nav>

        {/* 底部：场景总数 + 主题控件 */}
        <div
            className="flex items-center justify-between border-t p-3"
            style={{
              borderColor: "var(--sidebar-border)",
              background: "var(--sidebar-bg)"
            }}
        >
        <span
            className="text-xs"
            style={{ color: "var(--sidebar-muted)" }}
        >
          {totalScenariosLabel}
        </span>

          <div className="flex items-center gap-1">
            <ThemeSettingsMenu />
            <ThemeToggle />
          </div>
        </div>
      </aside>
  );
}