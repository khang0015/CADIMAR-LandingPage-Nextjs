'use client';

import { useState, useEffect } from 'react';
import { translations, type TranslationKey } from '@/lib/translations';

export function useTranslations() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    if (['en', 'vi'].includes(savedLang)) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  const t = (key: TranslationKey): string => {
    if (!isClient) {
      // Return English as fallback during SSR
      return translations.en[key] || key;
    }
    
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
    currentLanguage,
    changeLanguage,
    isClient
  };
}
