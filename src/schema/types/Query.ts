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

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve: async () => {
        return exerciseResolver.Query.exercises();
      },
    },
    exercise: {
      type: ExerciseType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        return exerciseResolver.Query.exersice({ id: id });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        return userResolver.Query.users();
      },
    },
    reports: {
      type: new GraphQLList(CommentReportType),
      resolve: async () => {
        return reportsResolver.Query.reports();
      },
    },
    trainings: {
      type: new GraphQLList(TrainingType),
      resolve: async () => {
        return trainingResolver.Query.traingings();
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: async () => {
        return categoryResolver.Query.categories();
      },
    },
    pods: {
      type: new GraphQLList(PodType),
      resolve: async () => {
        return podResolver.Query.pods();
      },
    },
    filteredTrainingByIdUser: {
      type: new GraphQLList(TrainingType),
      args: { idUser: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { idUser }) => {
        return trainingResolver.Query.traingingByIdUSer({ idUser: idUser });
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
    deleteTraining: {
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
