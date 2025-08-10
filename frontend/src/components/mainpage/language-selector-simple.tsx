'use client';

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';

interface LanguageSelectorProps {
  variant?: 'default' | 'compact';
  currentLang?: string;
  onLanguageChange?: (lang: string) => void;
  className?: string;
}

export default function LanguageSelector({ 
  variant = 'default',
  className = ''
}: LanguageSelectorProps) {
  const { currentLanguage, changeLanguage } = useTranslations();

  const handleLanguageChange = () => {
    const newLang = currentLanguage === 'en' ? 'vi' : 'en';
    changeLanguage(newLang);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Globe className="w-4 h-4" />
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleLanguageChange}
      >
        {currentLanguage === 'en' ? 'EN' : 'VI'}
      </Button>
    </div>
  );
}
