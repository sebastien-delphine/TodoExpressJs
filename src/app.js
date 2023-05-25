import express from 'express';
import { router as indexRouter } from './routes/index.js';
import { router as usersRouter } from './routes/users.js';

var app = express();

app.use('/', indexRouter);
app.use('/users', usersRouter);

export { app };
