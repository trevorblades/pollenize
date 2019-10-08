import {AuthenticationError, UserInputError, gql} from 'apollo-server-express';
import {Candidate, Message} from '../db';
import {bulkCreateUpdate, getMessageResolver} from '../utils';

export const typeDef = gql`
  extend type Query {
    candidate(id: ID!): Candidate
  }

  extend type Mutation {
    updateCandidate(
      id: ID!
      name: String
      parties: [MessageInput]!
      color: String!
      portrait: String
      birthDate: String
      hometown: String!
      bios: [MessageInput]!
      active: Boolean!
    ): Candidate
  }

  extend type Election {
    candidates(active: Boolean): [Candidate]
  }

  extend type Stance {
    candidate: Candidate
  }

  type Candidate {
    id: ID
    slug: String
    name: String
    party(languageId: ID!): String
    color: String
    portrait: String
    birthDate: String
    hometown: String
    bio(languageId: ID!): String
    active: Boolean
  }
`;

export const resolvers = {
  Query: {
    candidate(parent, args) {
      return Candidate.findByPk(args.id);
    }
  },
  Mutation: {
    async updateCandidate(parent, {id, parties, bios, ...args}, {user}) {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }

      const candidate = await Candidate.findByPk(id);
      if (!candidate) {
        throw new UserInputError('Candidate not found');
      }

      const newParties = await bulkCreateUpdate(parties, Message);
      await candidate.setParties(newParties);

      const newBios = await bulkCreateUpdate(bios, Message);
      await candidate.setBios(newBios);

      return candidate.update(args);
    }
  },
  Election: {
    candidates(parent, args) {
      return parent.getCandidates({
        where: args.active ? {active: args.active} : null
      });
    }
  },
  Stance: {
    candidate(parent) {
      return parent.getCandidate();
    }
  },
  Candidate: {
    party: getMessageResolver('getParties'),
    bio: getMessageResolver('getBios')
  }
};
