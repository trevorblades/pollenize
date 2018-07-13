import ISO6391 from 'iso-639-1';
import filter from 'lodash/filter';

export function getMessageOrUntranslated(messages, language, languages) {
  const message = messages[language];
  if (message) {
    return {
      message,
      match: true
    };
  }

  for (let i = 0; i < languages.length; i++) {
    const message = messages[languages[i].code];
    if (message) {
      return {message};
    }
  }

  return {message: null};
}

export function messagesFromEvent(
  event,
  languages,
  keys = ['messages'],
  stringify
) {
  return keys.map(key => {
    const messages = languages.map(language => ({
      text: event.target[`${key}.${language.code}.text`].value,
      language_id: language.id
    }));

    const filtered = filter(messages, 'text');
    if (stringify) {
      return JSON.stringify(filtered);
    }

    return filtered;
  });
}

export function createMessageField(
  languages,
  errors,
  label,
  key = 'messages',
  multiline
) {
  return languages.map(({code}, index) => {
    const error = errors && (errors[key] || errors[`${key}[${index}].text`]);
    return [
      `${key}.${code}.text`,
      {
        error: Boolean(error),
        helperText: error && error.msg,
        label: `${label} (${ISO6391.getNativeName(code)})`,
        multiline
      }
    ];
  });
}

export function createMessageFields(languages, errors, ...fields) {
  return fields.map(field => createMessageField(languages, errors, ...field));
}
