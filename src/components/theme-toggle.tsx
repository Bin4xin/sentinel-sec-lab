"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme, useLocale } from "@/lib/locale-context";
import { UI_TEXT } from "@/lib/i18n";

export function ThemeToggle() {
  const { themeMode, toggleThemeMode, systemFollow, colorScheme } = useTheme();
  const { locale } = useLocale();
  const t = UI_TEXT[locale];

  const isDisabled = systemFollow;
  const isHighlight = colorScheme === "highlight";

  return (
    <button
      onClick={toggleThemeMode}
      disabled={isDisabled}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${
        isDisabled
          ? "cursor-not-allowed opacity-40"
          : "hover:bg-[var(--sidebar-border)]"
      }`}
      title={isDisabled ? "已启用跟随系统" : themeMode === "dark" ? t.light_mode : t.dark_mode}
      style={isHighlight && !isDisabled ? { color: "var(--accent)" } : { color: "var(--sidebar-text)" }}
    >
      {themeMode === "dark" ? (
        <Sun size={16} />
      ) : (
        <Moon size={16} />
      )}
    </button>
  );
}
