export function localize({en, fr}, lang) {
  switch (lang) {
    case 'fr':
      return fr || en;
    case 'en':
    default:
      return en || fr;
  }
}
