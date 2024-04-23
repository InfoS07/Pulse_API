// server.ts
import express from 'express';
import morgan from 'morgan';

const app = express();

const HOST: string = '0.0.0.0';
const PORT: number = Number(process.env.PORT || 8080);

/**
 * Middlewares
 */
app.use(express.json());
app.use(morgan('dev'));

/**
 * Route initialization
 */
app.get('/', (req, res) => {
  debugger;
  res.json({ hello: 'World !' });
});

/**
 * Port definition
 */
app.listen(PORT, HOST, () => {
  console.log('\x1b[43m%s\x1b[0m', `API listening at http://${HOST}:${PORT}`);
});
