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
    last_name: {
      type: GraphQLString,
    },
    first_name: {
      type: GraphQLString,
    },
    profile_photo: {
      type: GraphQLString,
    },
    strike_count: {
      type: GraphQLInt,
    },
    created_at: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    fitness_goal: {
      type: GraphQLString,
    },
    postal_address: {
      type: GraphQLString,
    },
    birth_date: {
      type: GraphQLString,
    },
    height_cm: {
      type: GraphQLInt,
    },
    weight_kg: {
      type: GraphQLInt,
    },
    target_weight: {
      type: GraphQLInt,
    },
    waist_size: {
      type: GraphQLInt,
    },
    arm_size: {
      type: GraphQLInt,
    },
  },
});
