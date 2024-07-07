import internal from 'stream';
import database from '../database';
import { print } from 'graphql';

const databaseName = 'users';

const userResolver = {
  Query: {
    user: async ({ idUser }: any) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select('*')
          .eq('uid', idUser)
          .single();
        if (error) {
          throw new Error("Impossible de récupérer l'utilisateur");
        }
        return data;
      } catch (error) {
        throw new Error("Erreur lors de la récupération de l'utilisateur");
      }
    },
    users: async ({ user_id, searchTerm }: any) => {
      try {
        let queryBuilder = database
          .from(databaseName)
          .select('*')
          .neq('uid', user_id);

        if (searchTerm) {
          queryBuilder = queryBuilder.or(
            `username.ilike.%${searchTerm}%,first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`
          );
        }

        const { data, error } = await queryBuilder;

        console.log('error', error);

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
