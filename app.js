require('dotenv').config()
const cron = require('node-cron')
const dayjs = require('dayjs')
const savefacturacionMasivaCapita = require('./bundle/facturacion_masiva/application/savefacturacionMasivaSapUseCase') // CAPITA
const saveSapEvento = require('./bundle/facturacion_masiva/application/saveSapEventoUseCase')
const saveFacturacionMasivaEventoCapita = require('./bundle/facturacion_masiva/application/saveSapEventoCapita.useCase')

// const {hanaTestConnection} = require('./database/hanaClient')
const OrdrSync = require('./bundle/ordrSync/applications/ordrSync.usecase')
const OrdrRegister = require('./bundle/ordrSync/applications/registroOv.usecase')
const PagosSync = require('./bundle/pagosSync/applications/pagosSync.usecase')
const entradaMercancia = require('./bundle/entradas_mercancia/applications/saveEntradaMercancia.useCase')
const OinvSyncSegupharma = require('./bundle/segupharma/applications/oinvSycn.usecase')
const crearPendientesCapita = require('./bundle/intranet.pharmasan.net/applications/creacionPendientesCapita.usecase')
const crearPendientesEvento = require('./bundle/intranet.pharmasan.net/applications/creacionPendientesEvento.usecase')
const crearPendientes = require('./bundle/intranet.pharmasan.net/applications/creacionPendientes.usecase')

console.log('start...' + dayjs().format('YYYY-MM-DD'))
cron.schedule('*/2 * * * 1-5', savefacturacionMasivaCapita) // cada 1 minuto
cron.schedule('*/50 * * * * 6,0', savefacturacionMasivaCapita) // cada 50 segundos sabado y domingo
cron.schedule('* * * * * *', saveSapEvento) // cada segundo
cron.schedule('* * * * * *', saveFacturacionMasivaEventoCapita) // cada segundo

// Crear entradas de mercancia cada 2 minutos de la preliminar
cron.schedule('*/2 * * * *', entradaMercancia,{
  scheduled: true,
  timezone: "America/Bogota"
})

/** registro de ovs de PG en SAP todos los dias a la 1 am **/
cron.schedule('0 1 * * *', OrdrRegister,{
  scheduled: true,
  timezone: "America/Bogota"
})
/** todos los dias a la 2 am **/
cron.schedule('0 2 * * *', OrdrSync,{
  scheduled: true,
  timezone: "America/Bogota"
})

/** todos los dias a la 10 am **/
cron.schedule('0 10 * * *', OrdrSync,{
  scheduled: true,
  timezone: "America/Bogota"
})

/** pagos de cuotas **/
cron.schedule('* * * * *', PagosSync,{
  scheduled: true,
  timezone: "America/Bogota"
})

/** Oinv Sync Segupharma **/
cron.schedule('* * * * *', OinvSyncSegupharma,{
  scheduled: true,
  timezone: "America/Bogota"
})


cron.schedule('*/5 * * * * *', crearPendientes,{
  scheduled: true,
  timezone: "America/Bogota"
})



