import database from '../database';

const databaseName = 'pods';

const podResolver = {
  Query: {
    pods: async () => {
      try {
        const { data, error } = await database.from(databaseName).select('*');
        if (error) {
          throw new Error('Impossible de récupérer les pods');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des pods');
      }
    },
  },
};

export default podResolver;
