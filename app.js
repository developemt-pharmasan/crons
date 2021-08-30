require('dotenv').config()
const cron = require('node-cron')
const {Sequelize} = require("sequelize")
const {development, test, production} = require('./config/database')
const nextScheduledPaymentsUseCase = require('./bundle/amortizaciones/application/nextScheduledPaymentsUseCase')
cron.schedule('* * * * *', async () => {
  const Postgres = new Sequelize(development)
  try {
    await Postgres.authenticate();
    console.log('La conexión se ha establecido correctamente.');
    nextScheduledPaymentsUseCase(Postgres)
  } catch (error) {
    console.error('No se puede conectar a la base de datos:', error);
  }
})


