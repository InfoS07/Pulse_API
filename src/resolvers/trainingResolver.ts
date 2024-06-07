import internal from 'stream';
import database from '../database';

const databaseName = 'training';

const trainingResolver = {
  Query: {
    traingingByIdUSer: async ({ idUser }: any) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select('*')
          .eq('author', idUser);
        if (error) {
          throw new Error('Impossible de récupérer les entraînements');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des entraînements');
      }
    },
    traingings: async () => {
      try {
        const { data, error } = await database.from(databaseName).select('*');
        if (error) {
          throw new Error('Impossible de récupérer les entraînements');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des entraînements');
      }
    },
  },
};

export default trainingResolver;
