export function getCandidateTitles(
  {name, partyEn, partyFr},
  partyFirst,
  localize
) {
  if (partyEn || partyFr) {
    const party = localize(partyEn, partyFr);
    return partyFirst ? [party, name] : [name, party];
  }

  return [name];
}
