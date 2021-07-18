import {ApolloClient, HttpLink, ApolloLink, InMemoryCache} from '@apollo/client';
import fetch from 'isomorphic-fetch';

const httpLink = new HttpLink({
  uri: process.env.GATSBY_API_URL + '/graphql',
  fetch
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
