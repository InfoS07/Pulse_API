import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'ExercisesDifficulty',
  description: 'The difficulty of an exercise.',
  values: {
    NOVICE: {
      value: 'NOVICE',
    },
    CONFIRMED: {
      value: 'CONFIRMED',
    },
    HARD: {
      value: 'HARD',
    },
  },
});
