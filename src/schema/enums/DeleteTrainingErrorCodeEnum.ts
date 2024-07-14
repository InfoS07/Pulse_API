import { GraphQLEnumType } from 'graphql';

// Définissez les codes d'erreur disponibles pour la suppression d'un entraînement
const DeleteTrainingErrorCodeEnum = new GraphQLEnumType({
  name: 'DeleteTrainingErrorCode',
  values: {
    UNKNOWN_ERROR: { value: 'UNKNOWN_ERROR' },
    TRAINING_NOT_FOUND: { value: 'TRAINING_NOT_FOUND' },
    UNAUTHENTICATED: { value: 'UNAUTHENTICATED' },
    // Ajoutez d'autres codes d'erreur si nécessaire
  },
});

export default DeleteTrainingErrorCodeEnum;
