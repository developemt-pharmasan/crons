require('dotenv').config()
const cron = require('node-cron')
const nextScheduledPaymentsUseCase = require('./bundle/amortizaciones/application/nextScheduledPaymentsUseCase')
const requestsCreateRankDaysAlertUseCase = require('./bundle/compras/application/requestsCreateRankDaysAlertUseCase')
const { correosInformativosUseCase } = require('./bundle/sensores/application/correos.informativos.useCase')
const nextScheduledPaymentsUseCase = require('./bundle/amortizaciones/application/nextScheduledPaymentsUseCase')

cron.schedule('0 7 * * *',nextScheduledPaymentsUseCase) // produccion 07:00 am

cron.schedule('0 7 * * *', requestsCreateRankDaysAlertUseCase) // produccion 07:00 am

cron.schedule('0 7 * * *', nextScheduledPaymentsUseCase) // produccion 07:00 am

cron.schedule('* * *', correosInformativosUseCase) // cada hora


