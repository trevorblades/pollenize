import PropTypes from 'prop-types';
import React, {createContext, useState} from 'react';

export const languages = {
  en: 'English',
  fr: 'Français'
};

export const LanguageContext = createContext();

export function LanguageProvider(props) {
  const languageState = useState('en');
  return (
    <LanguageContext.Provider value={languageState}>
      {props.children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired
};
