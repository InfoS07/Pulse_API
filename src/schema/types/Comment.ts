import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { UserType } from './User';
import userResolver from '../../resolvers/userResolver';
import { create } from 'domain';

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: {
      type: GraphQLID,
    },
    training_id: {
      type: GraphQLInt,
    },
    user_id: {
      type: GraphQLInt,
    },
    created_at: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
      resolve: async (obj) => {
        return await userResolver.Query.user({
          idUser: obj.user_id,
        });
      },
    },
    content: {
      type: GraphQLString,
    },
  },
});
