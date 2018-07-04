import filter from 'lodash/filter';
import jwtDecode from 'jwt-decode';
import slugify from 'limax';

// TODO: publish this as an npm package
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

export function scrollToTop() {
  window.scrollTo(0, 0);
}

export function userFromToken(token) {
  if (!token) {
    return null;
  }

  let claims;
  try {
    claims = jwtDecode(token);
  } catch (error) {
    // token is invalid
  }

  if (!claims || !claims.exp || Date.now() > claims.exp * 1000) {
    return null;
  }

  delete claims.exp;
  delete claims.iat;
  return {
    ...claims,
    token
  };
}
