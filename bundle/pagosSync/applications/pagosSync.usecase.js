const ordrList = require('../infrastructure/repositories/pagosList.repository')
const IncomingPayments = require('../services')
const save = require('../infrastructure/repositories/pagosSave.repository')
module.exports = async () => {
  const _IncomingPayments = new IncomingPayments()
  const _ordrList = await ordrList()
  for (const element of _ordrList) {
    const result = await _IncomingPayments.create(JSON.parse(element.TextJson))
    await save(result,element)
  }
}