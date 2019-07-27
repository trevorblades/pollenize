import {Candidate} from '../db';
import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Query {
    candidate(id: ID!): Candidate
  }

  extend type Election {
    candidates: [Candidate]
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
  Election: {
    candidates(parent) {
      return parent.getCandidates({
        where: {
          active: true
        }
      });
    }
  }
};
