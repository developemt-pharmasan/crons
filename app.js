require('dotenv').config()
const cron = require('node-cron')
const dayjs = require('dayjs')
// const savefacturacionMasivaCapita = require('./bundle/facturacion_masiva/application/savefacturacionMasivaSapUseCase') // CAPITA
// const saveSapEvento = require('./bundle/facturacion_masiva/application/saveSapEventoUseCase')
// const saveFacturacionMasivaEventoCapita = require('./bundle/facturacion_masiva/application/saveSapEventoCapita.useCase')
// const OrdrSync = require('./bundle/ordrSync/applications/ordrSync.usecase')
// const OrdrRegister = require('./bundle/ordrSync/applications/registroOv.usecase')
// const PagosSync = require('./bundle/pagosSync/applications/pagosSync.usecase')
const OinvSyncSegupharma = require('./bundle/segupharma/applications/oinvSycn.usecase')


console.log('start...' + dayjs().format('YYYY-MM-DD'))
// cron.schedule('*/2 * * * 1-5', savefacturacionMasivaCapita) // cada 1 minuto
// cron.schedule('*/50 * * * * 6,0', savefacturacionMasivaCapita) // cada 50 segundos sabado y domingo
// cron.schedule('* * * * * *', saveSapEvento) // cada segundo
// cron.schedule('* * * * * *', saveFacturacionMasivaEventoCapita) // cada segundo


// /** registro de ovs de PG en SAP todos los dias a la 1 am **/
// cron.schedule('0 1 * * *', OrdrRegister,{
//   scheduled: true,
//   timezone: "America/Bogota"
// })
// /** todos los dias a la 3 am **/
// cron.schedule('0 3 * * *', OrdrSync,{
//   scheduled: true,
//   timezone: "America/Bogota"
// })
// 
// /** pagos de cuotas **/
// cron.schedule('* * * * *', PagosSync,{
//   scheduled: true,
//   timezone: "America/Bogota"
// }) 
/** Oinv Sync Segupharma **/
cron.schedule('* * * * *', OinvSyncSegupharma,{
  scheduled: true,
  timezone: "America/Bogota"
}) 


