import jwtDecode from 'jwt-decode';

export function scrollToTop() {
  window.scrollTo(0, 0);
}

export function userFromToken(token) {
  try {
    const {exp, ...claims} = jwtDecode(token);
    if (!exp || Date.now() > exp * 1000) {
      return null;
    }

    delete claims.iat;
    delete claims.sub;

    return {
      ...claims,
      token
    };
  } catch (error) {
    return null;
  }
}
