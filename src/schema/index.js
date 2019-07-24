import merge from 'lodash/merge';
import {typeDef as Election, resolvers as electionResolvers} from './election';
import {gql, makeExecutableSchema} from 'apollo-server-express';

const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

export default makeExecutableSchema({
  typeDefs: [Query, Mutation, Election],
  resolvers: merge(electionResolvers)
});
