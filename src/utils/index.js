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

export const NO_OFFICIAL_STANCE = [
  'No official stance has been taken on this topic.',
  "Aucune position officielle n'a été prise sur ce sujet."
];
