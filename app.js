require('dotenv').config()
const cron = require('node-cron')
const nextScheduledPaymentsUseCase = require('./bundle/amortizaciones/application/nextScheduledPaymentsUseCase')
const requestsCreateRankDaysAlertUseCase = require('./bundle/compras/application/requestsCreateRankDaysAlertUseCase')
const { correosInformativosUseCase } = require('./bundle/sensores/application/correos.informativos.useCase')
const savefacturacionMasivaSapUseCase = require('./bundle/facturacion_masiva/application/savefacturacionMasivaSapUseCase')


// cron.schedule('0 7 * * *',nextScheduledPaymentsUseCase) // produccion 07:00 am

// cron.schedule('0 7 * * *', requestsCreateRankDaysAlertUseCase) // produccion 07:00 am

// cron.schedule('* * *', correosInformativosUseCase) // cada hora

// cron.schedule('*/2 * * * *', savefacturacionMasivaSapUseCase) // cada 2 minuto
