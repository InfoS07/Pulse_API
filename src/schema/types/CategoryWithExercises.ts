import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { ExerciseType } from './Exercise';

export const CategoryWithExercisesType = new GraphQLObjectType({
  name: 'CategoryWithExercisesType',
  fields: {
    id: {
      type: GraphQLID,
    },
    category: {
      type: GraphQLString,
    },
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve: async (obj) => {
        const exercises = obj.exercises.map(
          (ex: { exercise: { any: any } }) => {
            return ex;
          }
        );
        return exercises;
      },
    },
  },
});
