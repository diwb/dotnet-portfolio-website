"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const isPortuguese = language === "pt-BR";

  return (
    <div
      className="inline-flex items-center rounded border border-line bg-white/5 p-1 text-xs font-semibold"
      aria-label="Selecionar idioma"
    >
      <Languages className="mx-2 text-muted" size={16} aria-hidden="true" />
      <button
        className={`rounded px-2 py-1 ${isPortuguese ? "bg-accent text-surface" : "text-muted hover:text-ink"}`}
        type="button"
        aria-pressed={isPortuguese}
        onClick={() => setLanguage("pt-BR")}
      >
        PT
      </button>
      <button
        className={`rounded px-2 py-1 ${!isPortuguese ? "bg-accent text-surface" : "text-muted hover:text-ink"}`}
        type="button"
        aria-pressed={!isPortuguese}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
