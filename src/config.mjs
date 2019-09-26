const JWTConfig = {
    SECRET: 'thecakeisalie',
    TIMEOUT: '2d'
}

const DBConfig = {
    URL: 'mongodb+srv://root:thecakeisalie@cluster0-uuqge.mongodb.net/test?retryWrites=true&w=majority' //'mongodb://localhost:27017/trainwreckers'
}

const WSConfig = {
    http: 'http://localhost',
    path: '/yo',
}

export default {
    JWT: JWTConfig,
    DB: DBConfig
}