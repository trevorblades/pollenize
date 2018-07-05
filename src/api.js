import Frisbee from 'frisbee';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export default new Frisbee({
  baseURI:
    process.env.NODE_ENV === 'production'
      ? 'https://api.pollenize.org'
      : 'http://localhost:3000'
});
