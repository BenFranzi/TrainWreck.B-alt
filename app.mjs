import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import {default as authRouter} from './src/routes/auth.mjs';
import {default as usersRouter} from './src/routes/users.mjs';
import {default as trainsRouter} from './src/routes/trains.mjs';
import requireAuth from './src/middleware/requireAuth.mjs';
import {default as config} from './src/config.mjs';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(
    config.DB.URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const prefix = '/api';
const port = process.env.PORT || 80;

app.use(`${prefix}/auth`, authRouter);
app.use(`${prefix}/users`, requireAuth, usersRouter);
app.use(`${prefix}/trains`, requireAuth, trainsRouter);

app.listen(port, () => { console.log(`running :${port}`)});