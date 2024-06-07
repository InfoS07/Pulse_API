import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'ActivitiesStatus',
  description: 'The feeling of an activitie.',
  values: {
    BAD: {
      value: 'BAD',
    },
    GOOD: {
      value: 'GOOD',
    },
    PASSED: {
      value: 'PASSED',
    },
  },
});
