import internal from 'stream';
import database from '../database';

const databaseName = 'exercises_categories';

const categoryResolver = {
  Query: {
    categories: async () => {
      try {
        const { data, error } = await database.from(databaseName).select('*');
        if (error) {
          throw new Error('Impossible de récupérer les catégorie');
        }
        return data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des catégorie');
      }
    },
    categoriesById: async (categories_id: [Number]) => {
      try {
        const categoriesName: [string?] = [];
        const { data, error } = await database
          .from(databaseName)
          .select('id, category')
          .in('id', categories_id);

        if (error) {
          throw new Error('Impossible de récupérer les catégorie');
        }

        data.forEach((item: { id: any; category: any }) => {
          categoriesName.push(item.category as string);
        });
        return categoriesName;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des catégorie');
      }
    },
  },
};

export default categoryResolver;
