require('dotenv').config()
const cron = require('node-cron')
const nextScheduledPaymentsUseCase = require('./bundle/amortizaciones/application/nextScheduledPaymentsUseCase')
cron.schedule('* * * * * *', async () => {
  nextScheduledPaymentsUseCase()
})


