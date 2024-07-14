import internal from 'stream';
import database from '../database';
import { print } from 'graphql';

const databaseName = 'exercises';

type Exercise = {
  id: any;
  title: any;
  description: any;
  laps: any;
  level: any;
  score: any;
  photos: any;
  sequence: any;
  pod_count: any;
  created_at: any;
  repetitions: any;
  player_count: any;
  calories_burned: any;
  duration_one_repetition: any;
};

type Category = {
  id: any;
  category: any;
  exercises: Exercise[];
};

const exerciseResolver = {
  Query: {
    exercise: async ({ id }: any) => {
      try {
        const { data, error } = await database
          .from(databaseName)
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw new Error("Impossible de récupérer l'exercice");
        }
        return data;
      } catch (error) {
        throw new Error("Erreur lors de la récupération l'exercice");
      }
    },
    exercises: async (query?: String) => {
      try {
        let queryBuilder = database.from(databaseName).select('*');

        if (query) {
          queryBuilder = queryBuilder.or(
            `title.ilike.%${query}%,description.ilike.%${query}%`
          );
        }

        const { data, error } = await queryBuilder;

        if (error) {
          throw new Error('Impossible de récupérer les exercices');
        }

        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des exercices');
      }
    },
    /* exercisesGroupByCategories: async (query: String, category: String) => {
      try {
        let queryBuilder = database.from('exercises_categories').select(
          `
        id,
        category,
        exercises: categories_exercises (
          exercise: exercises(
          id,
            title,
            description,
            laps,
            level,
            score,
            photos,
            sequence,
            pod_count,
            created_at,
            repetitions,
            player_count,
            calories_burned,
            duration_one_repetition
          )
        )
      `
        );

        if (category) {
          queryBuilder = queryBuilder.or(`category.ilike.%${category}%`);
        }

        const { data, error } = await queryBuilder;

        if (error) {
          throw new Error('Impossible de récupérer les exercices');
        }

        let filteredData;
        let filteredData2: Category[];
        let formattedData;

        if (query) {
          query = query.trim().toLowerCase();
          filteredData2 = data
            .map((cat) => {
              const filteredExercises = cat.exercises
                .map((ex) => ex.exercise)
                .flat()
                .filter((exercise) => {
                  return (
                    exercise.title.toLowerCase().includes(query) ||
                    exercise.description.toLowerCase().includes(query)
                  );
                });

              return {
                ...cat,
                exercises: filteredExercises,
              };
            })
            .filter((cat) => cat.exercises.length > 0);

          formattedData = filteredData2.map((cat) => ({
            id: cat.id,
            category: cat.category,
            exercises: cat.exercises,
          }));
        } else {
          filteredData = data
            .map((cat) => {
              const filteredExercises = cat.exercises
                .map((ex) => ex.exercise)
                .flat()
                .filter((exercise) => {
                  return exercise;
                });

              return {
                ...cat,
                exercises: filteredExercises,
              };
            })
            .filter((cat) => cat.exercises.length > 0);

          formattedData = filteredData.map((cat) => ({
            id: cat.id,
            category: cat.category,
            exercises: cat.exercises,
          }));
        }

        return formattedData;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des exercices');
      }
    }, */
    /* recommendExercises: async ({ user_id }: any) => {
      try {
        // Étape 1: Récupérer les exercices que l'utilisateur a réalisés
        const { data: userExercises, error: userExercisesError } =
          await database
            .from('training') // Table qui stocke les exercices réalisés par l'utilisateur
            .select(
              'exercise_id, exercises ( categories_exercises ( category_id ))'
            )
            .eq('author_id', user_id);

        if (userExercisesError) {
          throw new Error(
            "Impossible de récupérer les exercices de l'utilisateur"
          );
        }

        // Calculer la fréquence de chaque catégorie
        const categoryFrequency = userExercises.reduce((acc, userExercise) => {
          const categoryId =
            userExercise.exercises[0].categories_exercises[0].category_id;
          if (categoryId in acc) {
            acc[categoryId]++;
          } else {
            acc[categoryId] = 1;
          }
          return acc;
        }, {});

        // Trier les catégories par fréquence décroissante
        const sortedCategories = Object.keys(categoryFrequency).sort(
          (a, b) => categoryFrequency[b] - categoryFrequency[a]
        );

        // Étape 3: Recommander des exercices basés sur les catégories les plus fréquentes
        const recommendedExercises = [];
        for (const categoryId of sortedCategories) {
          const { data: exercises, error: exercisesError } = await database
            .from('exercises')
            .select('*')
            .eq('category_id', categoryId)
            .limit(5); // Limite le nombre d'exercices recommandés par catégorie

          if (exercisesError) {
            throw new Error(
              'Impossible de récupérer les exercices recommandés'
            );
          }

          recommendedExercises.push(...exercises);
        }

        return recommendedExercises;
      } catch (error) {
        throw new Error('Erreur lors de la recommandation des exercices');
      }
    }, */
    imageByExercice: async (photos: [string]) => {
      try {
        const photosUrl: [string?] = [];
        photos.forEach((photo) => {
          const data = database.storage
            .from('exercises_photos')
            .getPublicUrl(photo);
          photosUrl.push(data.data.publicUrl);
        });
        return photosUrl;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des medias');
      }
    },
  },
};

export default exerciseResolver;
