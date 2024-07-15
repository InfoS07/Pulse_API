import internal from 'stream';
import database from '../database';
import { print } from 'graphql';

const databaseName = 'challenges_users';

const challengeUserResolver = {
  Query: {
    challengesUserWhereImInvatedOrImTheOwner: async ({ idUser }: any) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select('*')
          .or(`author_id.eq.${idUser},invites.cs.{${idUser}}`);

        console.log('idUser', idUser);
        console.log('error', error);
        if (error) {
          throw new Error('Impossible de récupérer les challenges');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des challenges');
      }
    },
  },
};

export default challengeUserResolver;
