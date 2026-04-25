export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/70 py-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-2 px-6 text-xs uppercase tracking-[0.16em] text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>Sukrit&apos;s AI Notes</p>
        <div className="flex items-center gap-4">
          <a href="mailto:sukrit.notes@gmail.com" className="hover:text-foreground">
            Email
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
