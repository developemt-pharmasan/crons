require('dotenv').config()
const cron = require('node-cron')
// const nextScheduledPaymentsUseCase = require('./bundle/amortizaciones/application/nextScheduledPaymentsUseCase')
// const requestsCreateRankDaysAlertUseCase = require('./bundle/compras/application/requestsCreateRankDaysAlertUseCase')
// const { correosInformativosUseCase } = require('./bundle/sensores/application/correos.informativos.useCase')
const savefacturacionMasivaCapita = require('./bundle/facturacion_masiva/application/savefacturacionMasivaSapUseCase') // CAPITA
// const saveSapEvento = require('./bundle/facturacion_masiva/application/saveSapEventoUseCase')
// const saveFacturacionMasivaEventoCapita = require('./bundle/facturacion_masiva/application/saveSapEventoCapita.useCase')
// const saveSegfacturacionSapUseCase = require('./bundle/segupharma_facturacion/application/savefacturacionMasivaSapUseCase')
const saveMipres = require('./bundle/mipres/application/listMipresUseCase')
const reporteEntregaFecha = require('./bundle/mipres/application/reporteEntregaMipresUseCase')
// const compararDireccionamientoEstado = require('./bundle/mipres/application/compararDireccionamientoMipresUseCase')

// const {hanaTestConnection} = require('./database/hanaClient')

// cron.schedule('0 7 * * *',nextScheduledPaymentsUseCase) // produccion 07:00 am
// cron.schedule('0 7 * * *', requestsCreateRankDaysAlertUseCase) // produccion 07:00 am
// cron.schedule('* * *', correosInformativosUseCase) // cada hora

console.log('start...')
cron.schedule('*/2 * * * 1-5', savefacturacionMasivaCapita) // cada 1 minuto
cron.schedule('*/50 * * * * 6,0', savefacturacionMasivaCapita) // cada 50 segundos sabado y domingo
// cron.schedule('* * * * * *', saveSapEvento) // cada 15 segundos
// cron.schedule('* * * * * *', saveFacturacionMasivaEventoCapita)


// cron.schedule('*/1 * * * *', saveSegfacturacionSapUseCase) // cada 1 minuto
cron.schedule('0 7 * * *', saveMipres) // diariamente 07:00 am
cron.schedule('0 12 * * *', saveMipres) // diariamente 07:00 am
cron.schedule('0 7 * * *', reporteEntregaFecha) // diariamente 07:00 am
// cron.schedule('*/1 * * * *', compararDireccionamientoEstado) // cada 1 minuto

// cron.schedule('*/1 * * * *', hanaTestConnection) // cada 1 minuto
