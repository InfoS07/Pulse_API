import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { UserType } from './User';
import userResolver from '../../resolvers/userResolver';

export const CommentReportType = new GraphQLObjectType({
  name: 'CommentReport',
  fields: {
    id: {
      type: GraphQLID,
    },
    comment_id: {
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
    reason_id: {
      type: GraphQLInt,
    },
    created_at: {
      type: GraphQLString,
    },
  },
});
