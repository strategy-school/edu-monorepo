import mongoose from 'mongoose';
import config from './src/config';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
  } catch {
    console.log('Collections were not present, skipping drop...');
  }
  await db.close();
};

void run();
