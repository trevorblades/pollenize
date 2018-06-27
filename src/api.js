import Frisbee from 'frisbee';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export default new Frisbee({baseURI: 'http://localhost:3000'});
