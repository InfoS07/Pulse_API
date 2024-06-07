import internal from 'stream';
import database from '../database';

const databaseName = 'exercises';

const exerciseResolver = {
  Query: {
    exercises: async () => {
      try {
        const { data, error } = await database.from(databaseName).select('*');
        if (error) {
          throw new Error('Impossible de récupérer les exercices');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des exercices');
      }
    },
    mediaByIdExercice: async ({ exercise_id }: any) => {
      try {
        const { data, error } = await database
          .from('exercises_media')
          .select('*')
          .eq('exercise_id', exercise_id);
        if (error) {
          throw new Error('Impossible de récupérer les medias');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des medias');
      }
    },
    exersice: async ({ id }: any) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select('*')
          .eq('id', id)
          .single();
        if (error) {
          throw new Error('Impossible de récupérer les exercices');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des exercices');
      }
    },
  },
};

export default exerciseResolver;
