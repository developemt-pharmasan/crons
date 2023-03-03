require('dotenv').config()
const cron = require('node-cron')
// const nextScheduledPaymentsUseCase = require('./bundle/amortizaciones/application/nextScheduledPaymentsUseCase')
// const requestsCreateRankDaysAlertUseCase = require('./bundle/compras/application/requestsCreateRankDaysAlertUseCase')
// const { correosInformativosUseCase } = require('./bundle/sensores/application/correos.informativos.useCase')
const savefacturacionMasivaSapUseCase = require('./bundle/facturacion_masiva/application/savefacturacionMasivaSapUseCase') // CAPITA
const saveSapEvento = require('./bundle/facturacion_masiva/application/saveSapEventoUseCase')
const saveFacturacionMasivaEventoCapita = require('./bundle/facturacion_masiva/application/saveSapEventoCapita.useCase')
// const saveSegfacturacionSapUseCase = require('./bundle/segupharma_facturacion/application/savefacturacionMasivaSapUseCase')


// cron.schedule('0 7 * * *',nextScheduledPaymentsUseCase) // produccion 07:00 am

// cron.schedule('0 7 * * *', requestsCreateRankDaysAlertUseCase) // produccion 07:00 am

// cron.schedule('* * *', correosInformativosUseCase) // cada hora

console.log('start...')
cron.schedule('*/2 * * * 1-5', savefacturacionMasivaSapUseCase) // cada 1 minuto
cron.schedule('*/50 * * * * 6,0', savefacturacionMasivaSapUseCase) // cada 50 segundos sabado y domingo
cron.schedule('* * * * * *', saveSapEvento) // cada 15 segundos
cron.schedule('* * * * * *', saveFacturacionMasivaEventoCapita)


// cron.schedule('*/1 * * * *', saveSegfacturacionSapUseCase) // cada 1 minuto
