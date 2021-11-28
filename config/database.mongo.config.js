module.exports = {
    default: 'development',
    connections: {
        development: {
            host: 'localhost',
            port: 27017,
            user: 'usuario',
            password: 'clave',
            database: 'sensor_manager',
            uri: 'mongodb://usuario:clave@127.0.0.1:27017/sensor_manager'
        },
        dynamic: {
            uri: 'mongodb://dbmongo:27017'
        },
        manager: {
            host: 'localhost',
            port: 27017,
            user: 'usuario',
            password: 'clave',
            database: 'sensor_manager',
            uri: 'mongodb://dbmongo:27017/sensor_manager'
        },
        production: {
            host: '127.0.0.1',
            port: 27017,
            user: 'root',
            password: 'example',
            database: 'pruebas'
        },
        test: {
            host: 'localhost',
            port: 27017,
            user: 'usuario',
            password: 'clave',
            database: 'test'
        },
    }
}