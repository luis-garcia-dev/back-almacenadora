import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/almacenadora',
  jwtSecret: process.env.JWT_SECRET || 'supersecretkey',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '12h',
  appName: process.env.APP_NAME || 'NovaStorage'
};
