import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

// Type pour les médias d'exercice
export const ExerciseMediaType = new GraphQLObjectType({
  name: 'ExerciseMedia',
  fields: {
    id: {
      type: GraphQLID,
    },
    exercise_id: {
      type: GraphQLID,
    }, // ID de l'exercice associé
    url_photo: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLString,
    },
  },
});
