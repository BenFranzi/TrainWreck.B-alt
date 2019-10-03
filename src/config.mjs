const JWTConfig = {
    SECRET: 'thecakeisalie',
    TIMEOUT: '2d'
}

const DBConfig = {
    URL: 'mongodb+srv://root:thecakeisalie@cluster0-uuqge.mongodb.net/test?retryWrites=true&w=majority' //'mongodb://localhost:27017/trainwreckers'
}

const WSConfig = {
    PATH: '/ws',
    PORT: 8081
}

const TrainStates = {
    "STOP": "STOP",
    "CONTINUE": "CONTINUE",
    "ACCEL": "ACCEL",
    "DECEL": "DECEL"
}

const MLObjects = {
    "People": "People",
    "Platform": "Platform",
    "RR": "RR",
    "GG": "GG",
    "YY": "YY",
    "RG": "RG",   
    "RY": "RY",   
    "GY": "GY",   
    "SpeedSign": "SpeedSign",   
    "SpeedRegulator": "SpeedRegulator"   
}

export default {
    JWT: JWTConfig,
    DB: DBConfig,
    WS: WSConfig,
    MLObjects: MLObjects,
    TrainStates: TrainStates
}