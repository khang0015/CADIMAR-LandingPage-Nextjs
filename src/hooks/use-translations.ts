'use client';

import { useState, useEffect } from 'react';
import { translations, type TranslationKey } from '@/lib/translations';

export function useTranslations() {
  const [currentLanguage, setCurrentLanguage] = useState('en'); // Always start with English
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Only load saved language after component mounts (client-side)
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && ['en', 'vi'].includes(savedLang)) {
      setCurrentLanguage(savedLang);
    }
    // If no saved language, stay with default 'en'
  }, []);

  const t = (key: TranslationKey): string => {
    // Always use English during SSR and initial render
    if (!isClient) {
      return translations.en[key] || key;
    }
    
    // After hydration, use current language with English fallback
    const lang = currentLanguage as 'en' | 'vi';
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (lang: string) => {
    if (['en', 'vi'].includes(lang)) {
      setCurrentLanguage(lang);
      if (isClient) {
        localStorage.setItem('preferred-language', lang);
      }
    }
  };

  return {
    t,
    currentLanguage: isClient ? currentLanguage : 'en', // Always return 'en' during SSR
    changeLanguage,
    isClient
  };
}
