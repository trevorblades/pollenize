import filter from 'lodash/filter';

export function getTitles(name, party, reversed) {
  const titles = filter([name, party]);
  return titles.length > 1 && reversed ? titles.reverse() : titles;
}
