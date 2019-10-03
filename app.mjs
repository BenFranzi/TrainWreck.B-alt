import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import {default as authRouter} from './src/routes/auth.mjs';
import {default as usersRouter} from './src/routes/users.mjs';
import {default as trainsRouter} from './src/routes/trains.mjs';
import requireAuth from './src/middleware/requireAuth.mjs';
import {default as config} from './src/config.mjs';
import cors from 'cors';

import {socket} from './src/socket.mjs'
import socketio from "socket.io";
import * as http from 'http';

 

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(
    config.DB.URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const prefix = '/api';
const port = process.env.PORT || 8080;

app.use(`${prefix}/auth`, authRouter);
app.use(`${prefix}/users`, requireAuth, usersRouter);
app.use(`${prefix}/trains`, requireAuth, trainsRouter);

// Socket Setup
const httpVar = http.Server(app);
const io = socketio(httpVar, {path: config.WS.PATH});
socket(io);
httpVar.listen(config.WS.PORT);

app.listen(port, () => { console.log(`running :${port}`)});







/*


var io = require('socket.io')(http, {
    path: '/ws',
    //example stuff
    serveClient: true,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
    //end example stuff
});*/