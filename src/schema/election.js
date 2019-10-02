import {Election, Language} from '../db';
import {gql} from 'apollo-server-express';

export const typeDef = gql`
  extend type Query {
    elections(public: Boolean): [Election]
    election(id: ID!): Election
  }

  extend type Candidate {
    election: Election
  }

  type Election {
    id: ID
    slug: String
    title: String
    flag: String
    intro(lang: String!): String
    partyFirst: Boolean
    public: Boolean
    endsAt: String
  }
`;

export const resolvers = {
  Query: {
    elections(parent, args) {
      return Election.findAll({
        where: args.public ? {public: args.public} : null,
        order: [['endsAt', 'desc']]
      });
    },
    election(parent, args) {
      return Election.findByPk(args.id);
    }
  },
  Candidate: {
    election(parent) {
      return parent.getElection();
    }
  },
  Election: {
    async intro(parent, args) {
      const language = await Language.findOne({
        where: {
          code: args.lang
        }
      });

      const [intro] = await parent.getIntros({
        where: {
          languageId: language.id
        }
      });

      return intro ? intro.text : null;
    }
  }
};
