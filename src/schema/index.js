import merge from 'lodash/merge';
import {
  typeDef as Candidate,
  resolvers as candidateResolvers
} from './candidate';
import {typeDef as Election, resolvers as electionResolvers} from './election';
import {typeDef as Source, resolvers as sourceResolvers} from './source';
import {typeDef as Stance, resolvers as stanceResolvers} from './stance';
import {typeDef as Topic, resolvers as topicResolvers} from './topic';
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
  typeDefs: [Query, Mutation, Election, Candidate, Topic, Stance, Source],
  resolvers: merge(
    electionResolvers,
    candidateResolvers,
    topicResolvers,
    stanceResolvers,
    sourceResolvers
  )
});
