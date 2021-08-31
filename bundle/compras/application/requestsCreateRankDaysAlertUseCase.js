const repository = require('../infrastructure/repository/requestsCreateRankAlertDateSendEmailRepository')
const useCase = require('../../email')
const dayjs = require('dayjs')
// const useCase = require('../application/requestsCreateRankDaysAlertSendEmailUseCase')
module.exports = () => {
  return repository().then(response => {
    for (const responseElement of response) {
      console.log(responseElement.email,'emailllllTo');
      const mail = {
        from: process.env.REQUESTS_EMAIL, // sender address
        to: responseElement.email,
        subject: `Alerta creación de solicitudes`,
        text: `Hoy es el último día para registrar la solicitud de productos, sino se realiza para este mes no recibirá suministros`,
        documentUrl: process.env.REQUESTS_REGISTER,
        ejs: 'alertaSolicitud'
      }
      useCase(mail)
    }
  }).catch(err => console.error(err))
}