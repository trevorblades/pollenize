import {AuthenticationError, UserInputError, gql} from 'apollo-server-express';
import {Candidate} from '../db';

export const typeDef = gql`
  extend type Query {
    candidate(id: ID!): Candidate
  }

  extend type Mutation {
    updateCandidate(
      id: ID!
      name: String
      partyEn: String
      partyFr: String
      birthDate: String
      hometown: String
      bioEn: String
      bioFr: String
      active: Boolean
    ): Candidate
  }

  extend type Election {
    candidates: [Candidate]
  }

  extend type Stance {
    candidate: Candidate
  }

  type Candidate {
    id: ID
    slug: String
    name: String
    partyEn: String
    partyFr: String
    bioEn: String
    bioFr: String
    birthDate: String
    hometown: String
    portrait: String
    color: String
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
    async updateCandidate(parent, {id, ...args}, {user}) {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }

      const candidate = await Candidate.findByPk(id);
      if (!candidate) {
        throw new UserInputError('Candidate not found');
      }

      return candidate.update(args);
    }
  },
  Election: {
    candidates(parent) {
      return parent.getCandidates({
        where: {
          active: true
        }
      });
    }
  },
  Stance: {
    candidate(parent) {
      return parent.getCandidate();
    }
  }
};
