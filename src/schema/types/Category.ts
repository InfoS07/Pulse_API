import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    id: {
      type: GraphQLID,
    },
    category: {
      type: GraphQLString,
    },
  },
});
