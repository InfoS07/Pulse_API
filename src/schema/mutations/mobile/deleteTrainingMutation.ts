import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { SupabaseClient } from '@supabase/supabase-js';
import DeleteTrainingErrorCodeEnum from '../../enums/DeleteTrainingErrorCodeEnum';

const deleteTrainingMutation: GraphQLFieldConfig<
  any,
  { database: SupabaseClient; viewer: any }
> = mutationWithClientMutationId({
  name: 'DeleteTraining',
  description: 'Delete a Training.',
  inputFields: {
    trainingId: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    success: { type: GraphQLBoolean },
    errorCode: { type: DeleteTrainingErrorCodeEnum },
  },
  mutateAndGetPayload: async (input, { database, viewer }) => {
    const { trainingId } = input;

    if (!viewer) {
      return {
        success: false,
        errorCode: 'UNAUTHENTICATED',
      };
    }

    // Check if the training exists and belongs to the authenticated user
    const { data: training, error: fetchError } = await database
      .from('training')
      .select('*')
      .eq('id', trainingId)
      .eq('author_id', viewer.id)
      .single();

    if (fetchError || !training) {
      return {
        success: false,
        errorCode: 'TRAINING_NOT_FOUND',
      };
    }

    // Proceed to delete the training
    const { error: deleteError } = await database
      .from('training')
      .delete()
      .eq('id', trainingId);

    if (deleteError) {
      console.error('Error deleting training:', deleteError);
      return {
        success: false,
        errorCode: 'UNKNOWN_ERROR',
      };
    }

    return {
      success: true,
      errorCode: null,
    };
  },
});

export default deleteTrainingMutation;
