const connectionMongoUseCase = require('./mongo.connection.useCase');
const days = require('dayjs')
const getDispositivos = async (models,dispositivoIds) => {
    return await models.Dispositivo.find({
        _id: {
            $in: dispositivoIds
        }
    })
}
const getSensores = async (models,sensorIds) => {
    return await models.Sensor.find({
        _id: {
            $in: sensorIds
        }
    })
}
const getBitacoraData = async (models) => {
    const horaActual = days();
    const unaHoraAtras = days().subtract(1, 'hour');
    return await models.Bitacora.find({
        'createdAt':{
            $gte: unaHoraAtras,
            $lt: horaActual
        }
    })
}
const correosInformativosUseCase = async () => {
    try {
       const connectionMongo = await connectionMongoUseCase()
        const { conn, disconnect } = connectionMongo
        const bitacoraData = await getBitacoraData(conn.models)
        if (!bitacoraData) {
            disconnect()
            return
        }
        const sensoresData = await getSensores(conn.models,bitacoraData.map(bitacora => bitacora.sensorId))
        const dispositivosData = await getDispositivos(conn.models,sensoresData.map(sensor => sensor.dispositivoId))
        const data = dispositivosData.map(dispositivo => {
            const sensor = sensoresData.find(sensor => sensor.dispositivoId.toString() === dispositivo._id.toString())
            let insidencias = 0
            for (const [ key, value] of Object.entries(sensor)) {
                console.log(key, value);
                const bitacora = dispositivosData.filter(bitacora => bitacora.sensorId === value._id)
                insidencias += bitacora.length 
            }
            return {
                dispositvoNombre: dispositivo.nombre,
                dispositivoSerial: dispositivo.serial,
                insidencias
            }
        })
        console.log(data);
        disconnect()
    } catch (error) {
        console.log(error)
        disconnect()
    }
}
module.exports = {
    correosInformativosUseCase
}