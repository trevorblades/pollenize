import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {FormField} from '../common';

export default function LanguageFields({
  languages,
  messages,
  label,
  name,
  ...props
}) {
  return (
    <Fragment>
      {languages.map(language => {
        const message = messages.find(
          message => message.languageId === language.id
        );
        return (
          <FormField
            multiline
            key={language.id}
            label={`${label} (${language.code.toUpperCase()})`}
            name={`${name}[]`}
            defaultValue={message && message.text}
            inputProps={{'data-language': language.id}}
            {...props}
          />
        );
      })}
    </Fragment>
  );
}

LanguageFields.propTypes = {
  languages: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
