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
        text: `Alerta de creación de solicitudes`,
        subject: `Se encuentra en la base de datos el día de cierre (${dayjs().get('D')}), para la creación de solicitudes, no se encuentra registros de solicitudes`,
        documentUrl: process.env.REQUESTS_REGISTER,
        ejs: 'alertaSolicitud'
      }
      useCase(mail)
    }
  }).catch(err => console.error(err))
}