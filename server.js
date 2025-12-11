import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './src/config/env.js';
import { connectDb } from './src/config/db.js';
import routes from './src/routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: 'Demasiadas peticiones, intenta más tarde'
  })
);

app.get('/', (_req, res) => {
  res.json({ success: true, message: `${env.appName} API lista` });
});

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Recurso no encontrado' });
});

const start = async () => {
  await connectDb();
  app.listen(env.port, () => console.log(`Servidor escuchando en puerto ${env.port}`));
};

start();
