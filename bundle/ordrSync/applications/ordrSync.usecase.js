const ordrList = require('../infrastructure/repositories/ordrList.repository')
const Orders = require('../services')
const ordrSave = require('../infrastructure/repositories/ordrSave.repository')
module.exports = async () => {
  const _Orders = new Orders()
  const _ordrList = await ordrList()
  for (const element of _ordrList) {
    const data = {
      ...JSON.parse(element.TextJson)
    }
    const result = await _Orders.create(data)
    // console.log({result})
    await ordrSave(result,element)
  }
}