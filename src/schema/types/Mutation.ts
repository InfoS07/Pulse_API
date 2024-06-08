import { GraphQLObjectType } from 'graphql';
import createTrainingMutation from '../mutations/mobile/createTrainingMutation';
import deleteTrainingMutation from '../mutations/mobile/deleteTrainingMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTraining: createTrainingMutation,
    deleteTraining: deleteTrainingMutation,
  },
});
