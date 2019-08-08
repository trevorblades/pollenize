import PropTypes from 'prop-types';
import React, {createContext, useContext} from 'react';
import {useLocalStorage} from 'react-use';

export const languages = {
  en: 'English',
  fr: 'Français'
};

const LanguageContext = createContext();
export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider(props) {
  const [language, setLanguage] = useLocalStorage('language', 'en');
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        localize(en, fr) {
          const localized = language === 'en' ? en || fr : fr || en;
          return localized && localized.replace(/{lang}/, languages[language]);
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
