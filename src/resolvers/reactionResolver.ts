import database from '../database';

const databaseName = 'session_reactions_users';

const reactionResolver = {
  Query: {
    reactionByIdTraining: async ({ sessionId }: any) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select('*')
          .eq('session_id', sessionId);
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

export default reactionResolver;
