export function getParty({partyEn, partyFr}, language) {
  return language === 'en' ? partyEn || partyFr : partyFr || partyEn;
}

export function localize(en, fr, language) {
  return language === 'en' ? en || fr : fr || en;
}
