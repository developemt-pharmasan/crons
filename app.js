require('dotenv').config()
const cron = require('node-cron')
const dayjs = require('dayjs')
// const nextScheduledPaymentsUseCase = require('./bundle/amortizaciones/application/nextScheduledPaymentsUseCase')
// const requestsCreateRankDaysAlertUseCase = require('./bundle/compras/application/requestsCreateRankDaysAlertUseCase')
// const { correosInformativosUseCase } = require('./bundle/sensores/application/correos.informativos.useCase')
const savefacturacionMasivaCapita = require('./bundle/facturacion_masiva/application/savefacturacionMasivaSapUseCase') // CAPITA
const saveSapEvento = require('./bundle/facturacion_masiva/application/saveSapEventoUseCase')
const saveFacturacionMasivaEventoCapita = require('./bundle/facturacion_masiva/application/saveSapEventoCapita.useCase')
// const saveSegfacturacionSapUseCase = require('./bundle/segupharma_facturacion/application/savefacturacionMasivaSapUseCase')
// const saveMipres = require('./bundle/mipres/application/listMipresUseCase')
// const reporteEntregaFecha = require('./bundle/mipres/application/reporteEntregaMipresUseCase')
// const updateTmpMipres = require('./bundle/mipres/application/updateTempMipresUseCase')
// const compararDireccionamientoEstado = require('./bundle/mipres/application/compararDireccionamientoMipresUseCase')
// const syncEntregasMasivas = require('./bundle/entregas-masivas/application/syncEntregasMasivasUseCase')

// const {hanaTestConnection} = require('./database/hanaClient')
const OrdrSync = require('./bundle/ordrSync/applications/ordrSync.usecase')
const OrdrRegister = require('./bundle/ordrSync/applications/registroOv.usecase')
const PagosSync = require('./bundle/pagosSync/applications/pagosSync.usecase')
const OinvSyncSegupharma = require('./bundle/segupharma/applications/oinvSycn.usecase')
const crearPendientes = require('./bundle/intranet.pharmasan.net/applications/creacionPendientes.usecase')
// cron.schedule('0 7 * * *',nextScheduledPaymentsUseCase) // produccion 07:00 am
// cron.schedule('0 7 * * *', requestsCreateRankDaysAlertUseCase) // produccion 07:00 am
// cron.schedule('* * *', correosInformativosUseCase) // cada hora

console.log('start...' + dayjs().format('YYYY-MM-DD'))
cron.schedule('*/2 * * * 1-5', savefacturacionMasivaCapita) // cada 1 minuto
cron.schedule('*/50 * * * * 6,0', savefacturacionMasivaCapita) // cada 50 segundos sabado y domingo
cron.schedule('* * * * * *', saveSapEvento) // cada segundo
cron.schedule('* * * * * *', saveFacturacionMasivaEventoCapita) // cada segundo
// cron.schedule('*/1 * * * *', saveSapEvento) // cada 20 minutos
// cron.schedule(' */1 * * * *', syncEntregasMasivas) // 


// cron.schedule('*/1 * * * *', saveSegfacturacionSapUseCase) // cada 1 minuto

// cron.schedule('0 7 * * *', saveMipres) // diariamente 07:00 am
// cron.schedule('0 12 * * *', saveMipres) // diariamente 07:00 am

// cron.schedule('*/2 * * * *', saveMipres) // diariamente 07:00 am

// cron.schedule('0 7 * * *', reporteEntregaFecha) // diariamente 07:00 am

// cron.schedule('0 7 * * *', updateTmpMipres) // diariamente 07:00 am
// cron.schedule('*/1 * * * *', compararDireccionamientoEstado) // cada 1 minuto

// cron.schedule('*/1 * * * *', hanaTestConnection) // cada 1 minuto

/** registro de ovs de PG en SAP todos los dias a la 1 am **/
cron.schedule('0 1 * * *', OrdrRegister,{
  scheduled: true,
  timezone: "America/Bogota"
})
/** todos los dias a la 3 am **/
cron.schedule('0 3 * * *', OrdrSync,{
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

/** intranet pahrmasan .net **/
cron.schedule('*/5 * * * * *', crearPendientes,{
  scheduled: true,
  timezone: "America/Bogota"
}) 

