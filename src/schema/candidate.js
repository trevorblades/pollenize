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
      color: String
      portrait: String
      birthDate: String
      hometown: String
      bioEn: String
      bioFr: String
      active: Boolean
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
    async party(parent, {languageId}) {
      const [party] = await parent.getParties({
        where: {
          languageId
        }
      });

      return party ? party.text : null;
    },
    async bio(parent, {languageId}) {
      const [bio] = await parent.getBios({
        where: {
          languageId
        }
      });

      return bio ? bio.text : null;
    }
  }
};
