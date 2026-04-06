"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme, useLocale } from "@/lib/locale-context";
import { UI_TEXT } from "@/lib/i18n";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { locale } = useLocale();
  const t = UI_TEXT[locale];

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2 text-sm transition-colors hover:opacity-80"
      title={theme === "dark" ? t.light_mode : t.dark_mode}
    >
      {theme === "dark" ? (
        <>
          <Sun size={16} />
          <span className="hidden sm:inline">{t.light_mode}</span>
        </>
      ) : (
        <>
          <Moon size={16} />
          <span className="hidden sm:inline">{t.dark_mode}</span>
        </>
      )}
    </button>
  );
}
