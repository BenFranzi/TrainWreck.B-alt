import io from 'socket.io-client';
import {default as config} from './config.mjs';

const socket = io(config.WSConfig.http, {
    path: config.WSConfig.path,
});

function socketEmit(data) {
    socket.emit('message', data);
}

