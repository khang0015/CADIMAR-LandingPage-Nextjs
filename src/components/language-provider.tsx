"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LanguageContextType {
  currentLang: string;
  switchLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState("en");

  const switchLanguage = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem("preferred-language", lang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred-language");
    if (savedLang && ["en", "vi"].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLang, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
