import {AuthenticationError, UserInputError, gql} from 'apollo-server-express';
import {Candidate, Language} from '../db';

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
    party(lang: String!): String
    color: String
    portrait: String
    birthDate: String
    hometown: String
    bio(lang: String!): String
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
    async party(parent, args) {
      const language = await Language.findOne({
        where: {
          code: args.lang
        }
      });

      const [party] = await parent.getParties({
        where: {
          languageId: language.id
        }
      });

      return party ? party.text : null;
    },
    async bio(parent, args) {
      const language = await Language.findOne({
        where: {
          code: args.lang
        }
      });

      const [bio] = await parent.getBios({
        where: {
          languageId: language.id
        }
      });

      return bio ? bio.text : null;
    }
  }
};
