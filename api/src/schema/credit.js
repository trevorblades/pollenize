import {gql} from 'apollo-server-express';
import {sequelize} from '../db';

export const typeDef = gql`
  extend type Election {
    credits: [Credit]
  }

  type Credit {
    id: ID
    name: String
    role: String
  }
`;

export const resolvers = {
  Election: {
    credits(parent) {
      return parent.getCredits({
        order: [
          sequelize.fn(
            'substring',
            sequelize.col('name'),
            sequelize.literal("position(' ' in name) + 1")
          )
        ]
      });
    }
  }
};
