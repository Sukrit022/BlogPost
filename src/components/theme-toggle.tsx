"use client";

import { useState } from "react";

const STORAGE_KEY = "sukrit-theme";

type Theme = "light" | "dark";

function setDocumentTheme(theme: Theme): void {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    return;
  }

  document.documentElement.classList.remove("dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const savedTheme = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return savedTheme ?? (prefersDark ? "dark" : "light");
  });

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    setDocumentTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-border px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-muted transition hover:border-foreground"
      aria-label="Toggle dark and light theme"
      aria-pressed={theme === "dark"}
    >
      <span className="pl-1">{theme === "dark" ? "Dark" : "Light"}</span>
      <span className="relative h-5 w-9 rounded-full bg-border/80 transition">
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-transform ${theme === "dark" ? "translate-x-4" : "translate-x-0.5"}`}
        />
      </span>
    </button>
  );
}
