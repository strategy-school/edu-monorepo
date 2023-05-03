import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import coursesRouter from './routers/courses';
import transactionsRouter from './routers/transactions';
import usersRouter from './routers/users';
import categoriesRouter from './routers/categories';
import teachersRouter from './routers/teachers';
import commentsRouter from './routers/comments';
import testsRouter from './routers/tests';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('src/public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/transactions', transactionsRouter);
app.use('/categories', categoriesRouter);
app.use('/teachers', teachersRouter);
app.use('/comments', commentsRouter);
app.use('/tests', testsRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log('We are live on', port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
