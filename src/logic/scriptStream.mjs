import {spawn} from 'child_process'
import {default as trainLogic} from './trainState.mjs' 

const ML_PATH = '/Users/benfranzi/Projects/old_projects/STB/TrainWreck.B-alt/src/ml/ml.py'

export default (youtubeUrl, stdout) => {

    const py = spawn('python', ['-u', ML_PATH, youtubeUrl], {timeout: 2000});
    setTimeout(() => py.kill(1), 10*60*1000) // 10 minute timeout
    py.stdout.on('data', (data) => {
        const logic = trainLogic(data);
        if (IsJson(data.toString())) {
            stdout(logic, JSON.parse(data.toString()));
        }
        
    });

    py.stderr.on('data', (data) => {
        console.log('RUNNER-ERR: ' + data);
    });

    py.on('exit', (code) => {
        console.log('RUNNER-EXIT: ' + code);
    });
      
    return py;
}

const IsJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}