import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import "./globals.css";
import LanguageToggle from "@/components/LanguageToggle";
import { LanguageProvider, LocalizedText } from "@/components/LanguageProvider";
import { siteConfig } from "@/data/profile";
import { withBasePath } from "@/lib/paths";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.descriptionPt,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.descriptionPt,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.descriptionPt
  },
  alternates: {
    canonical: siteConfig.url
  },
  manifest: withBasePath("/manifest.webmanifest"),
  icons: {
    icon: withBasePath("/favicon.svg")
  }
};

const nav = [
  { href: "/", pt: "Início", en: "Home" },
  { href: "/projects", pt: "Projetos", en: "Projects" },
  { href: "/evidence", pt: "Evidências", en: "Evidence" },
  { href: "/architecture", pt: "Arquitetura", en: "Architecture" },
  { href: "/skills", pt: "Competências", en: "Skills" },
  { href: "/about", pt: "Sobre", en: "About" },
  { href: "/contact", pt: "Contato", en: "Contact" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <LanguageProvider>
          <a
            className="skip-link rounded bg-accent px-4 py-2 font-semibold text-surface"
            href="#content"
          >
            <LocalizedText pt="Pular para o conteúdo" en="Skip to content" />
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
                    <LocalizedText pt={item.pt} en={item.en} />
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <LanguageToggle />
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
            <LocalizedText
              pt="Portfólio static-first. Sem runtime Node, banco de dados ou backend em produção."
              en="Static-first portfolio. No production Node runtime, database or backend required."
            />
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
