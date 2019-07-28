export function getParty({partyEn, partyFr}, language) {
  return language === 'en' ? partyEn || partyFr : partyFr || partyEn;
}
