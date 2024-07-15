import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import exerciseResolver from '../../resolvers/exerciseResolver';
import categoryResolver from '../../resolvers/categoryResolver';
import { UserType } from './User';
import userResolver from '../../resolvers/userResolver';

export const ExerciseType = new GraphQLObjectType({
  name: 'Exercise',
  fields: {
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    sequence: {
      type: new GraphQLList(GraphQLInt),
    },
    type: {
      type: GraphQLString,
    },
    repetitions: {
      type: GraphQLInt,
    },
    pod_count: {
      type: GraphQLInt,
    },
    player_count: {
      type: GraphQLInt,
    },
    calories_burned: {
      type: GraphQLInt,
    },
    score: {
      type: GraphQLFloat,
    },
    difficulty: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLString,
    },
    photos: {
      type: new GraphQLList(GraphQLString),
      resolve: async (obj) => {
        return await exerciseResolver.Query.imageByExercice(obj.photos);
      },
    },
    categories: {
      type: new GraphQLList(GraphQLString),
      resolve: async (obj) => {
        return await categoryResolver.Query.categoriesById(obj.categories);
      },
    },
    price_coin: {
      type: GraphQLInt,
    },
    /* id_payed: {
      type: GraphQLBoolean,
    }, */
  },
});
