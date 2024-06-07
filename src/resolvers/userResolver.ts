import internal from 'stream';
import database from '../database';

const databaseName = 'users';

const userResolver = {
  Query: {
    user: async ({ idUser }: any) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select('*')
          .eq('id', idUser)
          .single();
        if (error) {
          throw new Error("Impossible de récupérer l'utilisateur");
        }
        return data;
      } catch (error) {
        throw new Error("Erreur lors de la récupération de l'utilisateur");
      }
    },
    users: async () => {
      try {
        const { data, error } = await database.from(databaseName).select('*');
        if (error) {
          throw new Error('Impossible de récupérer les utilisateurs');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }
    },
  },
};

export default userResolver;
