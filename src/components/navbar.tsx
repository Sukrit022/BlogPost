import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="group">
          <p className="font-display text-lg tracking-tight text-foreground transition group-hover:text-accent">
            Sukrit&apos;s Notes
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted">a thinking notebook</p>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link href="/notes" className="rounded-full px-3 py-1.5 text-muted transition hover:bg-card hover:text-foreground">
            Notes
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
