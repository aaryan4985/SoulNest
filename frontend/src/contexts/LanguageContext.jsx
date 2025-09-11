import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageManager } from '../utils/LanguageManager';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
  ];


  // Change language function (only on user action)
  const changeLanguage = async (langCode) => {
    if (isTranslating || langCode === currentLanguage) return;
    setIsTranslating(true);
    setCurrentLanguage(langCode);
    try {
      await LanguageManager.setLanguage(langCode);
    } catch (e) {
      // ignore
    }
    setIsTranslating(false);
  };


  // On first load, set hash to last selected language if not already set
  useEffect(() => {
    LanguageManager.ensureLanguageOnLoad();
    const detectedLang = LanguageManager.getCurrentLanguage();
    if (languages.find(lang => lang.code === detectedLang)) {
      setCurrentLanguage(detectedLang);
    } else {
      setCurrentLanguage('en');
      LanguageManager.persistLanguage('en');
    }
  }, []);

  // Monitor URL changes to sync state
  useEffect(() => {
    const handleHashChange = () => {
      const detectedLang = LanguageManager.getCurrentLanguage();
      if (detectedLang !== currentLanguage) {
        setCurrentLanguage(detectedLang);
        LanguageManager.persistLanguage(detectedLang);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentLanguage]);

  // Get current language object
  const getCurrentLanguageObj = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const value = {
    currentLanguage,
    languages,
    changeLanguage,
    getCurrentLanguageObj,
    isTranslating
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
