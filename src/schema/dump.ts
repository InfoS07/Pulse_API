import { promises as fs } from 'fs';
import { printSchema } from 'graphql';
import schema from '.';

(async () => {
  fs.writeFile('schema.graphql', printSchema(schema), { encoding: 'utf-8' });
  console.log('GraphQL schema dumped !\n');
})();
