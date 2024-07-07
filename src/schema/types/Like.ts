import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import { UserType } from './User';
import userResolver from '../../resolvers/userResolver';

export const LikeType = new GraphQLObjectType({
  name: 'Like',
  fields: {
    user: {
      type: UserType,
      resolve: async (obj) => {
        return await userResolver.Query.user({
          idUser: obj.user_id,
        });
      },
    },
  },
});
