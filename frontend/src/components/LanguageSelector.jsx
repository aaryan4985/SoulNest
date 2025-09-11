import React, { useState, useEffect } from 'react';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, languages, changeLanguage, getCurrentLanguageObj, isTranslating } = useLanguage();

  const handleLanguageChange = async (langCode) => {
    setIsOpen(false);
    await changeLanguage(langCode);
  };

  const currentLang = getCurrentLanguageObj();


  // (Optional) You may keep a one-time hide on mount, but do not poll or monitor
  useEffect(() => {
    setTimeout(() => {
      const selectors = [
        '.goog-te-banner-frame',
        '.goog-te-gadget',
        '.goog-te-balloon-frame', 
        '#goog-gt-tt',
        '.goog-te-balloon',
        '.skiptranslate',
        '.goog-te-gadget-simple',
        '.goog-te-menu-value',
        '.goog-te-menu-frame',
        'iframe.goog-te-banner-frame'
      ];
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
        });
      });
      document.body.style.top = '0px';
      document.body.style.position = 'static';
    }, 1000);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isTranslating}
        className={`flex items-center space-x-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md border border-gray-200 hover:bg-white shadow-sm transition-all duration-200 text-gray-700 text-xs ${
          isTranslating ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title={isTranslating ? "Translating..." : "Change Language"}
      >
        <FiGlobe className={`w-3 h-3 ${isTranslating ? 'animate-spin' : ''}`} />
        <span className="text-xs">{currentLang.flag}</span>
        <FiChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  disabled={isTranslating}
                  className={`w-full px-3 py-2 text-left hover:bg-[#ff3f74]/10 transition-colors duration-150 flex items-center space-x-2 text-xs ${
                    currentLanguage === language.code 
                      ? 'bg-[#ff3f74]/10 text-[#ff3f74]' 
                      : 'text-gray-700'
                  } ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="text-sm">{language.flag}</span>
                  <span className="text-xs font-medium">{language.name}</span>
                  {currentLanguage === language.code && (
                    <div className="ml-auto w-1.5 h-1.5 bg-[#ff3f74] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
