"use client";

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
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    const nextTheme: Theme = isDark ? "light" : "dark";

    setDocumentTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-border px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-muted transition hover:border-foreground hover:text-foreground"
      aria-label="Toggle dark mode"
    >
      Theme
    </button>
  );
}
