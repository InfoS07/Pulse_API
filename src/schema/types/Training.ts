import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { CommentType } from './Comment';
import commentResolver from '../../resolvers/commentResolver';
import reactionResolver from '../../resolvers/reactionResolver';
import { SessionReactionUserType } from './SessionReactionUser';

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
      type: GraphQLInt,
    },
    status: {
      type: GraphQLString,
    },
    planned_at: {
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
    comments: {
      type: new GraphQLList(CommentType),
      resolve: async (obj) => {
        return await commentResolver.Query.commentsBySessionId({
          sessionId: obj.id,
        });
      },
    },
    likes: {
      type: new GraphQLList(SessionReactionUserType),
      resolve: async (obj) => {
        return await reactionResolver.Query.reactionByIdTraining({
          sessionId: obj.id,
        });
      },
    },
  },
});
