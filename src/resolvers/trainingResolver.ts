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
          .eq('author_id', idUser);
        if (error) {
          throw new Error('Impossible de récupérer les entraînements');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des entraînements');
      }
    },
    mytraining: async ({ author_id }: any) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select('*')
          .eq('author_id', author_id);
        if (error) {
          throw new Error('Impossible de récupérer vos entraînements');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération de vos entraînements');
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
