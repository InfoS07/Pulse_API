import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import userResolver from '../../resolvers/userResolver';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLID,
    },
    uid: {
      type: GraphQLString,
    },
    last_name: {
      type: GraphQLString,
    },
    first_name: {
      type: GraphQLString,
    },
    profile_photo: {
      type: GraphQLString,
      resolve: async (obj) => {
        return await userResolver.Query.imageProfilByUser(obj.profile_photo);
      },
    },
    username: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    birth_date: {
      type: GraphQLString,
    },
    points: {
      type: GraphQLInt,
    },
  },
});
