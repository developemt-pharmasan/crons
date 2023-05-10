const NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('../../config/hana.config')[NODE_ENV];
const connect = async () => {
    const hana = require('@sap/hana-client');
    return hana.createConnection(); 
}
const hanaQuery = async(query, params) => {
    const conn =  await connect();
    return new Promise((resolve, reject) => {        
        conn.connect(config, function (err) {
            if (err) throw err;
            conn.exec(query, params, function (err, result) {
                if (err) {
                    console.log(err);
                    conn.disconnect()
                    reject(err)
                };
                conn.disconnect();
                resolve(result);
            });
        });
        
    });
}
const execute = ({conn,query,params}) => {
    return new Promise((resolve, reject) => {
        conn.exec(query, params, function (err, result) {
            if (err) {
                conn.disconnect()
                reject(err)
            }
            resolve(result);
        })
    })
}
const hanaTestConnection = async () => {
    const result = await hanaQuery('SELECT NOW() "HORA DE CONEXION" FROM DUMMY ').catch(err => {
        console.log(err);
    });
    console.log(result);
}
module.exports = {
    connect,
    hanaQuery,
    hanaTestConnection,
    hanaConfig: config,
    execute
};
