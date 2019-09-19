const JWTConfig = {
    SECRET: 'thecakeisalie',
    TIMEOUT: '2d'
}

const DBConfig = {
    URL: 'mongodb://localhost:27017/trainwreckers'
}

export default {
    JWT: JWTConfig,
    DB: DBConfig
}