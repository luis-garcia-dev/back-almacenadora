import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDb = async () => {
  try {
    await mongoose.connect(env.mongoUri, {
      autoIndex: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB', err.message);
    process.exit(1);
  }
};
