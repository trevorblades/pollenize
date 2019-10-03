import merge from 'lodash/merge';
import {
  typeDef as Candidate,
  resolvers as candidateResolvers
} from './candidate';
import {typeDef as Credit, resolvers as creditResolvers} from './credit';
import {typeDef as Election, resolvers as electionResolvers} from './election';
import {typeDef as Language, resolvers as languageResolvers} from './language';
import {typeDef as Message, resolvers as messageResolvers} from './message';
import {typeDef as Source, resolvers as sourceResolvers} from './source';
import {typeDef as Stance, resolvers as stanceResolvers} from './stance';
import {typeDef as Topic, resolvers as topicResolvers} from './topic';
import {typeDef as User, resolvers as userResolvers} from './user';
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
  typeDefs: [
    Query,
    Mutation,
    Election,
    Candidate,
    Topic,
    Stance,
    Source,
    User,
    Credit,
    Language,
    Message
  ],
  resolvers: merge(
    electionResolvers,
    candidateResolvers,
    topicResolvers,
    stanceResolvers,
    sourceResolvers,
    userResolvers,
    creditResolvers,
    languageResolvers,
    messageResolvers
  )
});
