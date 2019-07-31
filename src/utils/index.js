export function localize(en, fr, language) {
  return language === 'en' ? en || fr : fr || en;
}

export function getCandidateTitles(
  {name, partyEn, partyFr},
  partyFirst,
  language
) {
  if (partyEn || partyFr) {
    const party = localize(partyEn, partyFr, language);
    return partyFirst ? [party, name] : [name, party];
  }

  return [name];
}
