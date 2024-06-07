// server.ts
import express from 'express';
import morgan from 'morgan';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import defaultQuery from './queries/defaultQuery';
import populateDatabase from './database/populate';
import database from './database';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();

const HOST: string = '0.0.0.0';
const PORT: number = Number(process.env.PORT || 8080);
const JWT_SECRET = process.env.JWT_SECRET;

// Use CORS to allow requests from your Flutter app
app.use(cors());

/**
 * Middlewares
 */
app.use(express.json());
app.use(morgan('dev'));

/**
 * Middleware to verify JWT and restrict access to authenticated users
 */
const verifyToken = async (req: any, res: any, next: any) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'JWT secret missing' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;

    const { data: user, error } = await database.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

app.use(
  '/graphql',
  verifyToken,
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
