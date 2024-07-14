import { GraphQLSchema } from 'graphql';
import queryType from './types/Query';
import mutation from './types/Mutation';

export default new GraphQLSchema({
  query: queryType,
  mutation: mutation,
});
