const ordrList = require('../infrastructure/repositories/ordrList.repository')
const Orders = require('../services')
const ordrSave = require('../infrastructure/repositories/ordrSave.repository')
module.exports = async () => {
  console.log('ORDR !!!')
  const _Orders = new Orders()
  const _ordrList = await ordrList()
  for (const element of _ordrList) {
    const result = await _Orders.create(JSON.parse(element.TextJson))
    await ordrSave(result,element)
  }
}