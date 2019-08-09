import ApolloClient from 'apollo-boost';
import isoFetch from 'isomorphic-fetch';

const client = new ApolloClient({
  uri: `${process.env.GATSBY_API_URL}/graphql`,
  fetch: isoFetch
});

export default client;
