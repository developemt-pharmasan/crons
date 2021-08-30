require('dotenv').config()
const cron = require('node-cron')
const nextScheduledPaymentsUseCase = require('./bundle/amortizaciones/application/nextScheduledPaymentsUseCase')
cron.schedule('0 7 * * *',nextScheduledPaymentsUseCase) // produccion 07:00 am


