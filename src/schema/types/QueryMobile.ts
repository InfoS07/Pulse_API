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
import { profile } from 'console';

const QueryMobile = new GraphQLObjectType({
  name: 'QueryMobile',
  fields: {
    exercise: {
      type: ExerciseType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        return exerciseResolver.Query.exercise({ id: id });
      },
    },
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve: async () => {
        return exerciseResolver.Query.exercises();
      },
    },
    exercisesRecommend: {
      type: new GraphQLList(ExerciseType),
      resolve: async (_, __, { viewer }) => {
        return exerciseResolver.Query.exercises();
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: async () => {
        return categoryResolver.Query.categories();
      },
    },
    myPods: {
      type: new GraphQLList(PodType),
      resolve: async (_, __, { viewer }) => {
        return podResolver.Query.myPods({
          owner_user_id: viewer.id,
        });
      },
    },
    // TODO
    allTrainings: {
      type: new GraphQLList(TrainingType),
      resolve: async (_, __, { viewer }) => {
        return trainingResolver.Query.myTraining({
          user_id: viewer.id,
        });
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
    saveTraining: {
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
    feedUser: {
      type: new GraphQLList(TrainingType),
      args: { idUser: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (obj, args) => {
        // TODO
        return [];
      },
    },
    profile: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, __, { viewer }) => {
        return userResolver.Query.user({
          id: viewer.id,
        });
      },
    },
    // TODO
    followers: {
      type: new GraphQLList(UserType),
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        return; //userResolver.Query.followers({ id });
      },
    },
    // TODO
    following: {
      type: new GraphQLList(UserType),
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        return; //userResolver.Query.following({ id });
      },
    },
    // TODO
    myFollowers: {
      type: new GraphQLList(UserType),
      resolve: async (_, __, { viewer }) => {
        return; //userResolver.Query.followers({ id: viewer.id });
      },
    },
    // TODO
    myFollowing: {
      type: new GraphQLList(UserType),
      resolve: async (_, __, { viewer }) => {
        return; //userResolver.Query.following({ id: viewer.id });
      },
    },
  },
});

export default QueryMobile;
