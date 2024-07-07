import internal from 'stream';
import database from '../database';
import { print } from 'graphql';

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
    myTraining: async ({ author_id }: any) => {
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
    myFollowersTraining: async ({ author_id }: any) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select('*')
          .eq('author_id', author_id);
        if (error) {
          throw new Error(
            'Impossible de récupérer les entraînements de vos abonnés'
          );
        }
        return data;
      } catch (error) {
        throw new Error(
          'Erreur lors de la récupération des entraînements de vos abonnés'
        );
      }
    },
    trainings: async (user_id: string, viewer_id: string) => {
      try {
        // Étape 1: Récupérer les user_id des utilisateurs auxquels vous êtes abonné
        const { data: followersData, error: followersError } = await database
          .from('user_followers')
          .select('user_id')
          .eq('follower_id', user_id);

        if (followersError) {
          throw new Error('Impossible de récupérer les abonnements');
        }

        // Extraire les user_id des abonnés
        const followingUserIds = followersData.map(
          (follower) => follower.user_id
        );
        console.log('followersData', followersData);
        console.log('followingUserIds', followingUserIds);

        if (followingUserIds.length === 0) {
          return []; // Si pas d'abonnés, retourner une liste vide
        }

        // Étape 2: Récupérer les entraînements des utilisateurs abonnés
        const { data: trainingsData, error: trainingsError } = await database
          .from('training')
          .select(
            ` *,
              users:users!training_author_id_fkey(*),
              likes:training_like_users(*)
            `
          )
          .in('author_id', followingUserIds)
          .order('created_at', { ascending: false });

        console.log('trainingsData', trainingsData);

        if (trainingsError) {
          throw new Error('Impossible de récupérer les entraînements');
        }

        return trainingsData;
      } catch (error) {
        throw new Error(
          `Erreur lors de la récupération des entraînements: ${error}`
        );
      }
    },

    traingingsByIdUser: async (user_id: Number) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select(
            '*, users:users!training_author_id_fkey(*) , likes : training_like_users(*)'
          )
          .order('created_at', { ascending: false })
          .eq('author_id', user_id);

        let response = data?.map((training: any) => {
          training.users = training.users.filter((user: any) =>
            user.user_followers.map(
              (follow: any) => follow.id_follower === user_id
            )
          );
        });

        if (error) {
          throw new Error('Impossible de récupérer les entraînements');
        }
        return response;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des entraînements');
      }
    },
  },
};

export default trainingResolver;
