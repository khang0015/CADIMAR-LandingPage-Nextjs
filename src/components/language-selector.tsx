'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Language {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isActive: boolean;
  sortOrder: number;
}

interface LanguageSelectorProps {
  variant?: 'default' | 'compact';
  currentLang?: string;
  onLanguageChange?: (lang: string) => void;
  className?: string;
}

export default function LanguageSelector({ 
  variant = 'default',
  currentLang: propCurrentLang,
  onLanguageChange,
  className = ''
}: LanguageSelectorProps = {}) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState(propCurrentLang || 'en');
  const [isClient, setIsClient] = useState(false);

  // Initialize client state
  useEffect(() => {
    setIsClient(true);
    if (!propCurrentLang) {
      const savedLang = localStorage.getItem('preferred-language') || 'en';
      setCurrentLang(savedLang);
    }
    fetchLanguages();
  }, [propCurrentLang]);

  // Update current language when prop changes
  useEffect(() => {
    if (propCurrentLang) {
      setCurrentLang(propCurrentLang);
    }
  }, [propCurrentLang]);

  const fetchLanguages = async () => {
    try {
      const response = await fetch('/api/languages');
      if (response.ok) {
        const data = await response.json();
        setLanguages(data);
      } else {
        // Fallback languages
        setLanguages([
          {
            id: 'lang-en',
            code: 'en',
            name: 'English',
            nativeName: 'English',
            flag: '🇺🇸',
            isActive: true,
            sortOrder: 0,
          },
          {
            id: 'lang-vi',
            code: 'vi',
            name: 'Vietnamese',
            nativeName: 'Tiếng Việt',
            flag: '🇻🇳',
            isActive: true,
            sortOrder: 1,
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
      // Fallback languages
      setLanguages([
        {
          id: 'lang-en',
          code: 'en',
          name: 'English',
          nativeName: 'English',
          flag: '🇺🇸',
          isActive: true,
          sortOrder: 0,
        },
        {
          id: 'lang-vi',
          code: 'vi',
          name: 'Vietnamese',
          nativeName: 'Tiếng Việt',
          flag: '🇻🇳',
          isActive: true,
          sortOrder: 1,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = async (langCode: string) => {
    setCurrentLang(langCode);
    
    if (!propCurrentLang && isClient) {
      localStorage.setItem('preferred-language', langCode);
    }
    
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  if (!isClient || loading) {
    return (
      <div className={`flex items-center space-x-2 px-3 py-2 ${className}`}>
        <Globe className="w-4 h-4 text-gray-400" />
        <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`gap-2 ${className}`}
          >
            <span className="text-lg">{currentLanguage?.flag || '🌐'}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[200px]">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.id}
              onClick={() => handleLanguageChange(language.code)}
              className="flex items-center justify-between gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.nativeName}</span>
              </div>
              {language.code === currentLang && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`gap-2 ${className}`}
        >
          <Globe className="h-4 w-4" />
          <span className="text-lg">{currentLanguage?.flag || '🌐'}</span>
          <span className="font-medium">{currentLanguage?.nativeName || 'Language'}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.id}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between gap-2 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-xs text-muted-foreground">{language.name}</span>
              </div>
            </div>
            {language.code === currentLang && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
