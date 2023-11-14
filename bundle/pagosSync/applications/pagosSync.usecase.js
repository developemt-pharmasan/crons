const ordrList = require('../infrastructure/repositories/pagosList.repository')
const IncomingPayments = require('../services')
const save = require('../infrastructure/repositories/pagosSave.repository')
module.exports = async () => {
  console.log('Pagos recibidos !!!')
  const _IncomingPayments = new IncomingPayments()
  const _ordrList = await ordrList()
  for (const element of _ordrList) {
    let data = {
      U_PHR_Consignacion: element.Consignacion,
      ...JSON.parse(element.TextJson)
    }
    const result = await _IncomingPayments.create(data)
    await save(result,element)
  }
}