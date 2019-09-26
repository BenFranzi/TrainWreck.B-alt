import {spawn} from 'child_process'


export const start = () => {

};

const runScript = async (stdout) => {
    const { spawn } = require('child_process');
    const ls = spawn('ls', ['-lh', '/usr']);
    
    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    
    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
}

/*private async runScript(script: Script, args: string[], callback ?: (error ?: Error, stdout ?: string, stderr ?: string) => any) {
    setTimeout(async () => {
        await execFile(script.path, args, {
            timeout: DEFAULT_TIMEOUT,
        }, (err, stdout, stderr) => {
            if (err) {
                console.debug('Error occurred: ', err);
            }
            if (!!callback) {
                callback(err, stdout, stderr);
            }
        });
    }, 1000);
}*/
