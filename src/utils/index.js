export function localize(en, fr, language) {
  return language === 'en' ? en || fr : fr || en;
}
