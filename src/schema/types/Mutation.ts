import { GraphQLObjectType } from 'graphql';
import createTrainingMutation from '../mutations/createTrainingMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTraining: createTrainingMutation,
  },
});
