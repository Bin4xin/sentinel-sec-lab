"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Palette, Monitor, Check } from "lucide-react";
import { useTheme } from "@/lib/locale-context";

export function ThemeSettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { colorScheme, setColorScheme, systemFollow, setSystemFollow, themeMode } = useTheme();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Settings button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
          isOpen 
            ? "bg-[var(--sidebar-border)]" 
            : "hover:bg-[var(--sidebar-border)]"
        }`}
        title="主题设置"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Settings 
          size={16} 
          className="text-[var(--sidebar-text)]"
          style={{ color: isOpen ? "var(--accent, var(--sidebar-text))" : undefined }}
        />
      </button>

      {/* Dropdown menu - positioned above button to avoid overflow */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full left-0 mb-2 w-52 rounded-xl border shadow-xl z-50"
            style={{ 
              background: "var(--card-bg)",
              borderColor: "var(--card-border)"
            }}
          >
            {/* Menu header */}
            <div 
              className="flex items-center gap-2 px-3 py-2 border-b rounded-t-xl"
              style={{ borderColor: "var(--card-border)" }}
            >
              <Palette size={14} style={{ color: "var(--accent, var(--text-muted))" }} />
              <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                配色方案
              </span>
            </div>
            
            {/* Color Scheme Options */}
            <div className="p-2">
              {/* Default option - Apple style: subtle selection indicator */}
              <button
                onClick={() => setColorScheme("default")}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all"
                style={{
                  background: colorScheme === "default" 
                    ? "var(--sidebar-bg)" 
                    : "transparent",
                  color: "var(--sidebar-text)"
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Selection indicator - Apple style checkmark */}
                  <div 
                    className="flex h-5 w-5 items-center justify-center rounded-full border transition-colors"
                    style={{
                      borderColor: colorScheme === "default" 
                        ? "var(--accent, var(--primary))" 
                        : "var(--card-border)",
                      background: colorScheme === "default" 
                        ? "var(--accent, var(--primary))" 
                        : "transparent"
                    }}
                  >
                    {colorScheme === "default" && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <span>默认</span>
                </div>
              </button>
              
              {/* Highlight option - Apple style with accent indicator */}
              <button
                onClick={() => setColorScheme("highlight")}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all mt-1"
                style={{
                  background: colorScheme === "highlight" 
                    ? "rgba(130, 49, 142, 0.08)" 
                    : "transparent",
                  color: "var(--sidebar-text)"
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Selection indicator with accent color */}
                  <div 
                    className="flex h-5 w-5 items-center justify-center rounded-full border transition-colors"
                    style={{
                      borderColor: colorScheme === "highlight" 
                        ? "#82318E" 
                        : "var(--card-border)",
                      background: colorScheme === "highlight" 
                        ? "#82318E" 
                        : "transparent"
                    }}
                  >
                    {colorScheme === "highlight" && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <span className="flex items-center gap-2">
                    高亮
                    {/* Accent color preview dot */}
                    <span 
                      className="h-2 w-2 rounded-full"
                      style={{ background: "#82318E" }}
                    />
                  </span>
                </div>
              </button>
            </div>

            {/* Divider */}
            <div 
              className="mx-2 border-t"
              style={{ borderColor: "var(--card-border)" }}
            />

            {/* System Follow Section */}
            <div className="p-2">
              <div 
                className="mb-2 flex items-center gap-2 px-1"
                style={{ color: "var(--text-muted)" }}
              >
                <Monitor size={12} />
                <span className="text-xs font-medium">系统设置</span>
              </div>
              
              <button
                onClick={() => setSystemFollow(!systemFollow)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--sidebar-bg)]"
                style={{ color: "var(--sidebar-text)" }}
              >
                <span>跟随系统</span>
                {/* Apple-style toggle switch */}
                <div
                  className="relative h-6 w-11 rounded-full transition-colors duration-200"
                  style={{
                    background: systemFollow 
                      ? "var(--accent, #34C759)" 
                      : "var(--card-border)"
                  }}
                >
                  <div
                    className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                    style={{
                      transform: systemFollow ? "translateX(20px)" : "translateX(0)"
                    }}
                  />
                </div>
              </button>
              
              {systemFollow && (
                <p 
                  className="mt-1.5 px-3 text-[10px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  当前跟随系统{themeMode === "dark" ? "深色" : "浅色"}模式
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
