import {default as config} from './config.mjs';
import {default as runner} from './logic/scriptStream.mjs'

export const socket = (io) => {

    let spawn = null;
    let connections = new Set([]);

    io.on('connection', (socket) => {
        console.log('client connected');
        
        connections.add(socket);
        if (spawn == null) {
            spawn = runner('url', (logic, data) => {
                connections.forEach((connection) => {
                    connection.emit('train-data', JSON.stringify({logic: logic, data: data}))
                })
                
                console.log(logic, data);
            });   
        }
    
        socket.on('disconnect', function(){
            console.log('client disconnected');
            if (connections.has(socket)) {
                connections.delete(socket);
            }
            if (connections.size == 0) { // No current connections
                console.log('All clients disconnected, killing process');
                spawn.kill(1);
                spawn = null;
            }
            
        }); 
    })

    io.on('train_override', (msg) => {
        socket.emit('train_override', JSON.stringify({ logic: msg }))
    })
}