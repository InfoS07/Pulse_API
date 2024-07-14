import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'Category',
  description: 'The categories of a Training.',
  values: {
    ENDURANCE: {
      value: 'ENDURANCE',
    },
    CARDIO: {
      value: 'CARDIO',
    },
  },
});
