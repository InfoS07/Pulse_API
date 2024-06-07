import { GraphQLEnumType } from 'graphql';

// Définissez les codes d'erreur disponibles pour la création d'un entraînement
const CreateTrainingErrorCodeEnum = new GraphQLEnumType({
  name: 'CreateTrainingErrorCode',
  values: {
    UNKNOWN_ID: { value: 'UNKNOWN_ID' },
    ACCESS_DENIED: { value: 'ACCESS_DENIED' },
    // Ajoutez d'autres codes d'erreur si nécessaire
  },
});

export default CreateTrainingErrorCodeEnum;
