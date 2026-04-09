"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Locale } from "./i18n";

// ============================================
// TYPES
// ============================================
type ThemeMode = "light" | "dark";
type ColorScheme = "default" | "highlight";

interface ThemeContextType {
  // Theme state
  themeMode: ThemeMode;
  colorScheme: ColorScheme;
  systemFollow: boolean;
  
  // Actions
  toggleThemeMode: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
  setSystemFollow: (follow: boolean) => void;
}

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

// ============================================
// CONTEXTS
// ============================================
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// ============================================
// STORAGE KEYS
// ============================================
const STORAGE_KEYS = {
  themeMode: "theme-mode",
  colorScheme: "color-scheme",
  systemFollow: "system-follow",
};

// ============================================
// THEME PROVIDER
// ============================================
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>("default");
  const [systemFollow, setSystemFollowState] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage and system preference
  useEffect(() => {
    setMounted(true);
    
    // Load stored preferences
    const storedThemeMode = localStorage.getItem(STORAGE_KEYS.themeMode) as ThemeMode | null;
    const storedColorScheme = localStorage.getItem(STORAGE_KEYS.colorScheme) as ColorScheme | null;
    const storedSystemFollow = localStorage.getItem(STORAGE_KEYS.systemFollow);

    // Set color scheme
    if (storedColorScheme === "default" || storedColorScheme === "highlight") {
      setColorSchemeState(storedColorScheme);
    }

    // Set system follow
    const shouldFollowSystem = storedSystemFollow === "true";
    setSystemFollowState(shouldFollowSystem);

    // Set theme mode
    if (shouldFollowSystem) {
      // Follow system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeMode(prefersDark ? "dark" : "light");
    } else if (storedThemeMode === "light" || storedThemeMode === "dark") {
      setThemeMode(storedThemeMode);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeMode("dark");
    }
  }, []);

  // Apply theme changes to DOM
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // Apply dark/light mode
    if (themeMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Apply color scheme
    if (colorScheme === "highlight") {
      root.setAttribute("data-color-scheme", "highlight");
    } else {
      root.removeAttribute("data-color-scheme");
    }
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.themeMode, themeMode);
    localStorage.setItem(STORAGE_KEYS.colorScheme, colorScheme);
    localStorage.setItem(STORAGE_KEYS.systemFollow, String(systemFollow));
  }, [themeMode, colorScheme, systemFollow, mounted]);

  // Listen to system color scheme changes when systemFollow is enabled
  useEffect(() => {
    if (!systemFollow) return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setThemeMode(e.matches ? "dark" : "light");
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [systemFollow]);

  // Toggle theme mode (only works when not following system)
  const toggleThemeMode = () => {
    if (systemFollow) return; // Disabled when following system
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Set color scheme
  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme);
  };

  // Set system follow
  const setSystemFollow = (follow: boolean) => {
    setSystemFollowState(follow);
    if (follow) {
      // Immediately apply system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeMode(prefersDark ? "dark" : "light");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        colorScheme,
        systemFollow,
        toggleThemeMode,
        setColorScheme,
        setSystemFollow,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================
// LOCALE PROVIDER
// ============================================
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("zh");
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// ============================================
// HOOKS
// ============================================
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
