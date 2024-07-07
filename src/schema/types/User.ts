import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

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
  },
});
