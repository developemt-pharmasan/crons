const repository = require('../infrastructure/repository/nexShedulePaymentsRepository')
const useCase = require('../application/sendEmailsAlertPaymentUseCase')
module.exports = (Postgres) => {
  return repository(Postgres).then(response => {
    for (const responseElement of response) {
      const mail = {
        title: `Alerta de pago`,
        message: `La obligacion N° ${responseElement.obligationNumber} tiene el pago programado  de la cuota #${responseElement.installmentNumber} para el dia ${responseElement.paymentDate}`,
        documentUrl: `${process.env.AMORTIZATIONS_PAYMENTS}/${responseElement.productId}/${responseElement.obligationNumber}`
      }
      useCase(mail)
    }
  }).catch(err => console.error(err))
}