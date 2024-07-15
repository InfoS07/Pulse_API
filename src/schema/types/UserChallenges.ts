import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { UserType } from './User';
import userResolver from '../../resolvers/userResolver';

export const UserChallengesType = new GraphQLObjectType({
  name: 'UserChallenges',
  fields: {
    score: {
      type: GraphQLInt,
    },
    user: {
      type: UserType,
    },
  },
});
