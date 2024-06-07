import internal from 'stream';
import database from '../database';

const databaseName = 'categories';

const categoryResolver = {
  Query: {
    categories: async () => {
      try {
        const { data, error } = await database.from(databaseName).select('*');
        if (error) {
          throw new Error('Impossible de récupérer les catégorie');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des catégorie');
      }
    },
  },
};

export default categoryResolver;
