import {default as config} from './config.mjs';
import {default as runner} from './logic/scriptStream.mjs'

const States = {
    STOP: "STOP",
    CONTINUE: "CONTINUE",
    SLOW: "SLOW"
}

export const socket = (io) => {

    let spawn = null;
    let connections = new Set([]);


    let detectedInEpoch = new Set([]);
    let epoch = 0;

    let counter = {};
    let prevCounter = {};

    const determineState = () => {
        if (!!counter['RR']) {
            if (counter['RR'] >= 5) {
                return States.STOP;
            } else if (counter['RR'] >= 3) {
                return States.SLOW;
            }
        }
        return States.CONTINUE;
    }

    io.on('connection', (socket) => {
        console.log('client connected');
        
        connections.add(socket);
        if (spawn == null) {
            spawn = runner('url', (data) => {
                if (Math.floor(data.epoch) == epoch) {
                    if (!detectedInEpoch.has(data.detected)) {
                        detectedInEpoch.add(data.detected);
                        if (!counter[data.detected]) // If no record exists 
                        {
                            //Add first entry
                            counter[data.detected] = 1;
                        } else { 
                            //already exists, increment
                            counter[data.detected] = counter[data.detected] + 1;
                        }
                    }
                } else { //Different epoch
                    Object.keys(counter).forEach((item) => {
                        if (counter[item] == prevCounter[item]) {
                            counter[item] = 0;
                        }
                    });

                    const outp = {
                        data: Array.from(detectedInEpoch), 
                        epoch: epoch, 
                        url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                        recommend: determineState(),
                    } 
    
                    connections.forEach((connection) => {
                        connection.emit('train-data', JSON.stringify(outp))
                    });
                    Object.assign(prevCounter, counter);
                    detectedInEpoch.clear();

                    console.log(outp);
                }
                epoch = Math.floor(data.epoch);
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

