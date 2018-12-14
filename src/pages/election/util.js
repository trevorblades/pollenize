import ISO6391 from 'iso-639-1';
import filter from 'lodash/filter';
import slugify from 'limax';

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
  const isMultilingual = languages.length > 1;
  return languages.map(({code}, index) => {
    const error = errors && (errors[key] || errors[`${key}[${index}].text`]);
    return [
      `${key}.${code}.text`,
      {
        error: Boolean(error),
        helperText: error && error.msg,
        label: isMultilingual
          ? `${label} (${ISO6391.getNativeName(code)})`
          : label,
        multiline
      }
    ];
  });
}

export function createMessageFields(languages, errors, ...fields) {
  return fields.map(field => createMessageField(languages, errors, ...field));
}

export function getTitles(name, party, reversed) {
  const titles = filter([name, party && party.text]);
  return titles.length > 1 && reversed ? titles.reverse() : titles;
}

export function getNextSlug(title, slugs) {
  const nextSlug = slugify(title);
  const pattern = new RegExp(`^${nextSlug}(\\d*)$`);
  const matches = filter(slugs.map(slug => slug.match(pattern)));
  if (!matches.length) {
    return nextSlug;
  }

  const numbers = matches.map(match => Number(match[1]));
  const maxNumber = Math.max(...numbers) + 1;
  for (let i = 0; i <= maxNumber; i++) {
    if (!numbers.includes(i)) {
      return nextSlug + i;
    }
  }
}
