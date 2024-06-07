import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export const SessionReactionUserType = new GraphQLObjectType({
  name: 'SessionReactionUser',
  fields: {
    session_id: {
      type: GraphQLInt,
    },
    user_id: {
      type: GraphQLInt,
    },
    created_at: {
      type: GraphQLString,
    },
  },
});
