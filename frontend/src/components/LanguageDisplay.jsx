import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageDisplay = () => {
  const { currentLanguage, getCurrentLanguageObj, changeLanguage, isTranslating } = useLanguage();
  
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Current Language State</h3>
      <p><strong>Language Code:</strong> {currentLanguage}</p>
      <p><strong>Language Name:</strong> {getCurrentLanguageObj().name}</p>
      <p><strong>Is Translating:</strong> {isTranslating ? 'Yes' : 'No'}</p>
      
      <div className="mt-4">
        <h4 className="font-medium mb-2">Quick Test Buttons:</h4>
        <div className="space-x-2">
          <button 
            onClick={() => changeLanguage('hi')}
            className="px-3 py-1 bg-blue-500 text-white rounded"
            disabled={isTranslating}
          >
            हिंदी
          </button>
          <button 
            onClick={() => changeLanguage('en')}
            className="px-3 py-1 bg-green-500 text-white rounded"
            disabled={isTranslating}
          >
            English
          </button>
          <button 
            onClick={() => changeLanguage('fr')}
            className="px-3 py-1 bg-purple-500 text-white rounded"
            disabled={isTranslating}
          >
            Français
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageDisplay;
