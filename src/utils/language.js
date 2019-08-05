import PropTypes from 'prop-types';
import React, {createContext, useContext, useState} from 'react';

export const languages = {
  en: 'English',
  fr: 'Français'
};

const LanguageContext = createContext();
export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider(props) {
  const [language, setLanguage] = useState('en');
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        localize(en, fr) {
          return language === 'en' ? en || fr : fr || en;
        }
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired
};
