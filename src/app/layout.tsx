import type { Metadata } from "next";
import { Lora, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const bodySerif = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const displaySans = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Sukrit's Notes",
    template: "%s | Sukrit's Notes",
  },
  description: "A personal notebook of ideas, breakdowns, and thoughts on AI, startups, and research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodySerif.variable} ${displaySans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const storedTheme = localStorage.getItem('sukrit-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldUseDark = storedTheme ? storedTheme === 'dark' : prefersDark;
  if (shouldUseDark) document.documentElement.classList.add('dark');
})();`,
          }}
        />

        <div className="site-bg" aria-hidden="true" />
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10 md:px-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
