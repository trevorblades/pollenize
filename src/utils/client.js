import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: `${process.env.GATSBY_API_URL}/graphql`
});

export default client;
