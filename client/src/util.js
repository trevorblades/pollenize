import filter from 'lodash/filter';
import slugify from 'limax';

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
