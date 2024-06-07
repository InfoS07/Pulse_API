import internal from 'stream';
import database from '../database';

const databaseName = 'comment_reports';

const reportsResolver = {
  Query: {
    reports: async () => {
      try {
        const { data, error } = await database.from(databaseName).select('*');
        if (error) {
          throw new Error('Impossible de récupérer les signalements');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des signalements');
      }
    },
  },
};

export default reportsResolver;
