import PropTypes from 'prop-types';
import React, {createContext, useContext} from 'react';

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useLocalize(lang, languages) {
  return function localize(en, fr) {
    const localized = lang === 'en' ? en || fr : fr || en;
    return localized && localized.replace(/{lang}/, languages[lang]);
  };
}

export function LanguageProvider(props) {
  const localize = useLocalize(props.lang, props.languages);
  return (
    <LanguageContext.Provider
      value={{
        lang: props.lang,
        languages: props.languages,
        localize,
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
  languages: PropTypes.object,
  path: PropTypes.string,
  children: PropTypes.node.isRequired
};

LanguageProvider.defaultProps = {
  languages: {},
  path: ''
};
