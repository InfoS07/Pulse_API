import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { ExerciseType } from './Exercise';
import exerciseResolver from '../../resolvers/exerciseResolver';
import { TrainingType } from './Training';
import trainingResolver from '../../resolvers/trainingResolver';
import { UserType } from './User';
import userResolver from '../../resolvers/userResolver';
import { CommentReportType } from './Reports';
import reportsResolver from '../../resolvers/reportResolver';
import { CategoryType } from './Category';
import categoryResolver from '../../resolvers/categoryResolver';
import { PodType } from './Pod';
import podResolver from '../../resolvers/podResolver';
import { CategoryWithExercisesType } from './CategoryWithExercises';
import { ChallengeUserType } from './ChallengeUser';
import challengeUserResolver from '../../resolvers/challengeUserResolver';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    exercises: {
      type: new GraphQLList(ExerciseType),
      args: {
        query: {
          type: GraphQLString,
          description: 'The title of the exercice',
        },
      },
      resolve: async (_, { query }) => {
        const data = await exerciseResolver.Query.exercises(query);

        return data;
      },
    },
    /* exercicesGroupByCategories: {
      type: new GraphQLList(CategoryWithExercisesType),
      args: {
        query: {
          type: GraphQLString,
          description: 'The title of the exercice',
        },
        category: {
          type: GraphQLString,
          description: 'The category of the exercice',
        },
      },
      resolve: async (_, { query, category }) => {
        return await exerciseResolver.Query.exercisesGroupByCategories(
          query,
          category
        );
      },
    }, */
    exercise: {
      type: ExerciseType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        return exerciseResolver.Query.exercise({ id: id });
      },
    },
    /* exercisesRecommend: {
      type: new GraphQLList(ExerciseType),
      resolve: async (_, __, { viewer }) => {
        return exerciseResolver.Query.exercises();
      },
    }, */
    users: {
      type: new GraphQLList(UserType),
      args: {
        query: {
          type: GraphQLString,
          description:
            'a term to search for in the user name, first name, or last name',
        },
      },
      resolve: async (_, { query }, { viewer }) => {
        return userResolver.Query.users({
          user_id: viewer.id,
          searchTerm: query,
        });
      },
    },
    challengesUser: {
      type: new GraphQLList(ChallengeUserType),
      resolve: async (_, __, { viewer }) => {
        return challengeUserResolver.Query.challengesUserWhereImInvatedOrImTheOwner(
          {
            idUser: viewer.id,
          }
        );
      },
    },
    reports: {
      type: new GraphQLList(CommentReportType),
      resolve: async () => {
        return reportsResolver.Query.reports();
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: async () => {
        return categoryResolver.Query.categories();
      },
    },
    /* pods: {
      type: new GraphQLList(PodType),
      resolve: async () => {
        return podResolver.Query.pods();
      },
    }, */
    myPods: {
      type: new GraphQLList(PodType),
      resolve: async (_, __, { viewer }) => {
        return podResolver.Query.myPods({
          owner_user_id: viewer.id,
        });
      },
    },
    trainings: {
      type: new GraphQLList(TrainingType),
      resolve: async (_, __, { viewer }) => {
        return trainingResolver.Query.trainings(viewer.id);
      },
    },
    filteredTrainingByIdUser: {
      type: new GraphQLList(TrainingType),
      args: { idUser: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { idUser }) => {
        return trainingResolver.Query.traingingByIdUSer({ idUser: idUser });
      },
    },
    myTraining: {
      type: new GraphQLList(TrainingType),
      resolve: async (_, __, { viewer }) => {
        return trainingResolver.Query.myTraining({
          author_id: viewer.id,
        });
      },
    },
    // TODO
    myFollowersTraining: {
      type: new GraphQLList(TrainingType),
      resolve: async (_, __, { viewer }) => {
        return trainingResolver.Query.myFollowersTraining({
          author_id: viewer.id,
        });
      },
    },
    // TODO
    startTraining: {
      type: new GraphQLList(TrainingType),
      args: {
        idTraining: { type: new GraphQLNonNull(GraphQLID) },
        idUser: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (obj, args) => {
        // TODO
        return [];
      },
    },
    // TODO
    /* deleteTraining: {
      type: new GraphQLList(TrainingType),
      args: {
        idTraining: { type: new GraphQLNonNull(GraphQLID) },
        idUser: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (obj, args) => {
        // TODO
        return [];
      },
    }, */
    // TODO
    strikeByIdUser: {
      type: new GraphQLList(TrainingType),
      args: { idUser: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (obj, args) => {
        // TODO
        return [];
      },
    },
    // TODO
    planningByIdUser: {
      type: new GraphQLList(TrainingType),
      args: { idUser: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (obj, args) => {
        // TODO
        return [];
      },
    },
    // TODO
    feedUser: {
      type: new GraphQLList(TrainingType),
      args: { idUser: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (obj, args) => {
        // TODO
        return [];
      },
    },
  },
});
