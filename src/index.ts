// server.ts
import express from 'express';
import morgan from 'morgan';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import defaultQuery from './queries/defaultQuery';
import populateDatabase from './database/populate';
import database from './database';

const app = express();

const HOST: string = '0.0.0.0';
const PORT: number = Number(process.env.PORT || 8080);

/**
 * Middlewares
 */
app.use(express.json());
app.use(morgan('dev'));

/* app.use('/', (_, res) => {
  res.redirect('/graphql');
}); */

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    context: { database, viewer: null },
    graphiql: {
      defaultQuery,
    },
  })
);

app.get('/populate', async (req, res) => {
  try {
    await populateDatabase();
    res.status(200).send('Base de données peuplée avec succès !');
  } catch (error) {
    console.error('Erreur lors du peuplement de la base de données :', error);
    res.status(500).send('Erreur lors du peuplement de la base de données');
  }
});

/**
 * Port definition
 */
app.listen(PORT, HOST, () => {
  console.log('\x1b[43m%s\x1b[0m', `API listening at http://${HOST}:${PORT}`);
});
