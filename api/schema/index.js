import merge from 'lodash/merge.js';
import {
  typeDef as Candidate,
  resolvers as candidateResolvers
} from './candidate.js';
import {typeDef as Credit, resolvers as creditResolvers} from './credit.js';
import {
  typeDef as Election,
  resolvers as electionResolvers
} from './election.js';
import {typeDef as Keyword, resolvers as keywordResolvers} from './keyword.js';
import {
  typeDef as Language,
  resolvers as languageResolvers
} from './language.js';
import {typeDef as Message, resolvers as messageResolvers} from './message.js';
import {typeDef as Source, resolvers as sourceResolvers} from './source.js';
import {typeDef as Stance, resolvers as stanceResolvers} from './stance.js';
import {typeDef as Topic, resolvers as topicResolvers} from './topic.js';
import {typeDef as User, resolvers as userResolvers} from './user.js';
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
    Message,
    Keyword
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
    messageResolvers,
    keywordResolvers
  )
});
