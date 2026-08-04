import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import "./globals.css";
import { siteConfig } from "@/data/profile";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  },
  alternates: {
    canonical: siteConfig.url
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg"
  }
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/evidence", label: "Evidence" },
  { href: "/architecture", label: "Architecture" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          className="skip-link rounded bg-accent px-4 py-2 font-semibold text-surface"
          href="#content"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-40 border-b border-line bg-surface/88 backdrop-blur">
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4"
            aria-label="Primary"
          >
            <Link href="/" className="font-semibold tracking-wide">
              DIWB Engineering OS
            </Link>
            <div className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  className="rounded px-3 py-2 text-sm text-muted hover:bg-white/8 hover:text-ink"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <a
                className="rounded p-2 text-muted hover:text-ink"
                href={siteConfig.github}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                className="rounded p-2 text-muted hover:text-ink"
                href={siteConfig.linkedin}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                className="rounded p-2 text-muted hover:text-ink"
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </nav>
        </header>
        <main id="content">{children}</main>
        <footer className="border-t border-line px-4 py-8 text-center text-sm text-muted">
          Static-first portfolio. No production Node runtime, database or backend required.
        </footer>
      </body>
    </html>
  );
}
