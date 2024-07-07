import database from '../database';

const databaseName = 'training_like_users';

const likesResolver = {
  Query: {
    likesByIdTraining: async (trainingId: Number) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select('*')
          .eq('training_id', trainingId);
        if (error) {
          throw new Error("Impossible de récupérer les j'aimes");
        }
        return data;
      } catch (error) {
        throw new Error("Erreur lors de la récupération des j'aimes");
      }
    },
  },
};

export default likesResolver;
