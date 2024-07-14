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
    myPods: async ({ owner_user_id }: any) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select('*')
          .eq('owner_user_id', owner_user_id);
        if (error) {
          throw new Error('Impossible de récupérer vos pods');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération de vos pods');
      }
    },
  },
};

export default podResolver;
