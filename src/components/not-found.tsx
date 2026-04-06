"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/locale-context";

export function NotFound() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <div className="h-48 w-48" />
        <h1 className="mt-4 text-2xl font-bold text-[var(--foreground)]">404</h1>
        <p className="text-[var(--text-muted)]">Page not found</p>
      </div>
    );
  }

  const imgSrc = theme === "dark" 
    ? "/assets/pics/missing.png" 
    : "/assets/pics/missing-dark.png";

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <img
        src={imgSrc}
        alt="404 Not Found"
        className="h-48 w-auto object-contain"
      />
      <h1 className="mt-4 text-2xl font-bold text-[var(--foreground)]">404</h1>
      <p className="text-[var(--text-muted)]">Page not found</p>
    </div>
  );
}
