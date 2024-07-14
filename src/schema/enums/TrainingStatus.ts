import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'TrainingStatus',
  description: 'The status of a Training session.',
  values: {
    START: {
      value: 'START',
    },
    STARTED: {
      value: 'STARTED',
    },
    FINISH: {
      value: 'FINISH',
    },
  },
});
