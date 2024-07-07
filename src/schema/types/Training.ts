import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { CommentType } from './Comment';
import commentResolver from '../../resolvers/commentResolver';
import likesResolver from '../../resolvers/likesResolver';
import { LikeType } from './Like';
import { UserType } from './User';
import userResolver from '../../resolvers/userResolver';
import { ExerciseType } from './Exercise';
import exerciseResolver from '../../resolvers/exerciseResolver';

export const TrainingType = new GraphQLObjectType({
  name: 'Training',
  fields: {
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    activities_list: {
      type: new GraphQLList(GraphQLInt),
    },
    author: {
      type: UserType,
      resolve: async (obj) => {
        return await userResolver.Query.user({
          idUser: obj.author_id,
        });
      },
    },
    status: {
      type: GraphQLString,
    },
    start_at: {
      type: GraphQLString,
    },
    end_at: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLString,
    },
    exercise: {
      type: ExerciseType,
      resolve: async (obj) => {
        return await exerciseResolver.Query.exercise({
          id: obj.exercise_id,
        });
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: async (obj) => {
        return await commentResolver.Query.commentsBySessionId({
          sessionId: obj.id,
        });
      },
    },
    likes: {
      type: new GraphQLList(LikeType),
      resolve: async (obj) => {
        return await likesResolver.Query.likesByIdTraining(obj.id);
      },
    },
  },
});
