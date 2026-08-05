"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "pt-BR" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const storageKey = "portfolio-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt-BR");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "en" || saved === "pt-BR") {
      setLanguageState(saved);
      document.documentElement.lang = saved;
      return;
    }
    document.documentElement.lang = "pt-BR";
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: (nextLanguage) => {
        setLanguageState(nextLanguage);
        window.localStorage.setItem(storageKey, nextLanguage);
        document.documentElement.lang = nextLanguage;
      }
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return { language: "pt-BR" as Language, setLanguage: () => undefined };
  }
  return context;
}

export function LocalizedText({ pt, en }: { pt: string; en: string }) {
  const { language } = useLanguage();
  return <>{language === "pt-BR" ? pt : en}</>;
}
