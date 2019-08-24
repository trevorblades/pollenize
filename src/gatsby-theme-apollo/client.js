import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  uri: `${process.env.GATSBY_API_URL}/graphql`,
  fetch,
  request(operation) {
    const token = localStorage.getItem('token');
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }
});

export default client;
