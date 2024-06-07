import database from '../database';

const databaseName = 'comments';

const commentResolver = {
  Query: {
    commentsBySessionId: async ({ sessionId }: any) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select('*')
          .eq('session_id', sessionId);
        if (error) {
          throw new Error('Impossible de récupérer les commentaires');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des commentaires');
      }
    },
  },
};

export default commentResolver;
