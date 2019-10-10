import {spawn} from 'child_process'
import {default as trainLogic} from './trainState.mjs' 
import { start } from 'repl';

const ML_PATH = '/Users/benfranzi/Projects/old_projects/STB/TrainWreck.B-alt/src/ml/ml.py'

export default (youtubeUrl, stdout) => {

    const py = spawn('python', ['-u', ML_PATH, youtubeUrl]);
    setTimeout(() => py.kill(1), 10*60*1000) // 10 minute timeout

    py.stdout.on('data', (data) => {
        data.toString().split('{').forEach((startOfLine) => {
            if (startOfLine.length > 10) { 
                const single = '{' + startOfLine.split('}')[0] +'}';
                if (IsJson(single)) {
                    stdout(JSON.parse(single));
                } else {
                    console.log('not json', trimmed);
                }
            }
        });
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
        console.log(e.message);
        return false;
    }
    return true;
}