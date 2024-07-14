import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'ActivitiesStatus',
  description: 'The status of an activitie.',
  values: {
    NOVICE: {
      value: 'NOVICE',
    },
    STARTED: {
      value: 'STARTED',
    },
    PASSED: {
      value: 'PASSED',
    },
  },
});
