import filter from 'lodash/filter';

export function getTitles(name, party, reversed) {
  const titles = filter([name, party && party.text]);
  return titles.length > 1 && reversed ? titles.reverse() : titles;
}
