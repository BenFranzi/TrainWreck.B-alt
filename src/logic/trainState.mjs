import {default as config} from '../config.mjs';

const trainLogic = (objectData) => {
    let {MLObjects,TrainStates} = config;
    if (!IsJson(objectData))  {
        return TrainStates['CONTINUE'];
    }
    let {detected} = JSON.parse(objectData);
    let signal;
    switch (detected) {
        case MLObjects['People']:
            signal = TrainStates['DECEL'];
            break;
        case MLObjects['Platform']:
            signal = TrainStates['DECEL'];
            break;
        case MLObjects['RR']:
            signal = TrainStates['DECEL'];
            break;
        case MLObjects['GG']:
            signal = TrainStates['CONTINUE'];
            break;
        case MLObjects['YY']:
            signal = TrainStates['DECEL'];
            break;
        case MLObjects['RG']:
            signal = TrainStates['DECEL'];
            break;
        case MLObjects['RY']:
            signal = TrainStates['DECEL'];
            break;
        case MLObjects['GY']:
            signal = TrainStates['CONTINUE'];
            break;
        case MLObjects['SpeedSign']:
            signal = TrainStates['DECEL'];
            break;
        case MLObjects['SpeedRegulator']:
            signal = TrainStates['DECEL'];
            break;
        default:
            signal = TrainStates['CONTINUE'];
            break;
    }
    return signal;
}

const IsJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export default trainLogic;