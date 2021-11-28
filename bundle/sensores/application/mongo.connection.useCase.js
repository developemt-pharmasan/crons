const axios = require("axios").default;
const configDb = require('../../../config/database.mongo.config')
const mongoose = require('mongoose')
const authenticate = () => {
    return new Promise((resolve, reject) => {
        axios.request({
            method: 'POST',
            url: 'https://api.app.daily-tech.co/api/suscripciones/auth/by-nit',
            headers: { 'Content-Type': 'application/json' },
            data: { nit: '900249425' }
        }).then(function (response) {
            resolve(response.data)
        }).catch(function (error) {
            console.error({ error });
            reject(error)
        });

    })
}
const getSuscripciones = (token) => {
    return new Promise((resolve, reject) => {
        axios.request({
            method: 'POST',
            url: `${process.env.SENSOR_MANAGER_HOST}/api/suscripciones/auth/check`,
            headers: { 'Content-Type': 'application/json' },
            data: { token }
        }).then(function (response) {
            resolve(response.data)
        }).catch(function (error) {
            console.error(error);
            reject(error)
        });
    })
}
const createMongoConnection = async (sucription) => {
    // const uri = `${configDb.connections.dynamic.uri}/daily_${sucription.database}`
    const uri = `mongodb://localhost:27017/daily_${sucription.database}`
    console.log({ uri})
    let conn = mongoose.createConnection(uri);
    conn = require('../infraestructure/repositories')(conn)
    return { conn, disconnect: mongoose.disconnect }
}
module.exports = async () => {
    try {
        const { token } = await authenticate()
        const sucription = await getSuscripciones(token)
        return await createMongoConnection(sucription)
    } catch (error) {
        console.log(error)
    }
}