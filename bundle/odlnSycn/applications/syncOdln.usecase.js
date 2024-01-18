const List = require('../infrastructure/repositories/List.repository')
const DeliveryNotes = require('../services')
const Save = require('../infrastructure/repositories/Save.repository')
module.exports = async () => {
  console.log('Enviar a entregar !!!')
  const _DeliveryNotes = new DeliveryNotes()
  const _List = await  List()
  for (const element of _List) {
    let data = {
      ...JSON.parse(element.TextJson)
    }
    const result = await _DeliveryNotes.create(data)
    await Save(result,element)
  }
}