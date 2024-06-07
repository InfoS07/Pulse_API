import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';
import { ExerciseMediaType } from './ExerciseMedia';
import exerciseResolver from '../../resolvers/exerciseResolver';

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
    repetitions: {
      type: GraphQLInt,
    },
    pod_count: {
      type: GraphQLInt,
    },
    player_count: {
      type: GraphQLInt,
    },
    duration: {
      type: GraphQLInt,
    },
    calories_burned: {
      type: GraphQLInt,
    },
    author: {
      type: GraphQLString,
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
    media: {
      type: new GraphQLList(ExerciseMediaType),
      resolve: async (obj) => {
        return await exerciseResolver.Query.mediaByIdExercice({
          exercise_id: obj.id,
        });
      },
    },
  },
});
