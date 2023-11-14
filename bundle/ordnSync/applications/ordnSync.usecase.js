const list = require('../infrastructure/repositories/ordnList.repository')
const Returns = require('../services')
const save = require('../infrastructure/repositories/ordnSave.repository')
module.exports = async () => {
  const _Returns = new Returns()
  const _ordrList = await list()
  for (const element of _ordrList) {
    const result = await _Returns.create(JSON.parse(element.TextJson))
    await save(result,element)
  }
}