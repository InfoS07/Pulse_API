import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { SupabaseClient } from '@supabase/supabase-js';
import { TrainingType } from '../types/Training';
import CreateTrainingErrorCodeEnum from '../enums/CreateTrainingErrorCodeEnum';

const createTrainingMutation: GraphQLFieldConfig<
  any,
  { database: SupabaseClient }
> = mutationWithClientMutationId({
  name: 'CreateTraining',
  description: 'Create a Training.',
  inputFields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    training: { type: TrainingType },
    success: { type: GraphQLBoolean },
    errorCode: { type: CreateTrainingErrorCodeEnum },
  },
  mutateAndGetPayload: async (input, { database }) => {
    const { title, description } = input;

    const { data, error } = await database
      .from('training')
      .insert([{ title, description }])
      .select();
    if (error) {
      console.error('Error creating training:', error);
      return {
        training: null,
        success: false,
        errorCode: 'UNKNOWN_ID',
      }; // Remplacer 'UNKNOWN_ID' par le code d'erreur approprié
    }

    if (data.length > 0) {
      return {
        training: data[0],
        success: true,
        errorCode: null,
      };
    }
  },
});

export default createTrainingMutation;
