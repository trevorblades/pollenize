import PropTypes from 'prop-types';
import React, {createContext, useContext} from 'react';
import messages from './messages';

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useLocalize(lang) {
  return function localize(key) {
    try {
      return lang === 'en' ? key : messages[key][lang];
    } catch (error) {
      console.error(`Missing message key: ${key}`);
      return key;
    }
  };
}

export function LanguageProvider(props) {
  const localize = useLocalize(props.lang);
  return (
    <LanguageContext.Provider
      value={{
        localize,
        lang: props.lang,
        languages: props.languages,
        getPathForLanguage(lang) {
          return (
            '/' +
            [
              lang,
              ...props.path
                .split('/')
                .filter(Boolean)
                .slice(1)
            ].join('/')
          );
        }
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  lang: PropTypes.string.isRequired,
  languages: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
