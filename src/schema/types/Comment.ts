import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { UserType } from './User';
import userResolver from '../../resolvers/userResolver';

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: {
      type: GraphQLID,
    },
    session_id: {
      type: GraphQLInt,
    },
    user_id: {
      type: GraphQLInt,
    },
    user: {
      type: UserType,
      resolve: async (obj) => {
        return await userResolver.Query.user({
          idUser: obj.user_id,
        });
      },
    },
    text: {
      type: GraphQLString,
    },
  },
});
