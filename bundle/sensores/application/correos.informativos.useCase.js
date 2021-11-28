const connectionMongoUseCase = require('./mongo.connection.useCase');
const days = require('dayjs')
const { sendMail } = require('../../../libs/mail')
const ejs = require('ejs')
const path = require('path')
const sendEmails = async (data) => {
    ejs.renderFile(path.resolve(__dirname, '..', 'views', 'mails', 'incidesncia.por.hora.ejs'), {data}, {}, async (err, html) => {
        if (err) throw err
        const email = {
            from: process.env.AMORTIZATIONS_EMAIL, // sender address
            to: "go.juangomez23@gmail.com", // list of receivers
            subject: `Reporte de incidencias`, // Subject line
            text: ``, // plain text body
            html
        }
        await sendMail(email)
    });
} 
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
                const bitacora = dispositivosData.filter(bitacora => bitacora.sensorId === value._id)
                insidencias += bitacora.length 
            }
            return {
                dispositvoNombre: dispositivo.nombre,
                dispositivoSerial: dispositivo.serial,
                insidencias
            }
        })
        await sendEmails(data)
        console.log('Correos enviados');
        disconnect()
    } catch (error) {
        console.log(error)
        disconnect()
    }
}
module.exports = {
    correosInformativosUseCase
}