import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { UserType } from './User';
import userResolver from '../../resolvers/userResolver';

export const PodType = new GraphQLObjectType({
  name: 'Pod',
  fields: {
    id: {
      type: GraphQLID,
    },
    set_pods_id: {
      type: GraphQLInt,
    },
    owner_user_id: {
      type: GraphQLInt,
    },
    owner: {
      type: UserType,
      resolve: async (obj) => {
        return await userResolver.Query.user({
          idUser: obj.user_id,
        });
      },
    },
    current_state: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLString,
    },
  },
});
