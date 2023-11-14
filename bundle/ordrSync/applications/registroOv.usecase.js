const listPending = require('../infrastructure/repositories/listPending.repository')
const Operaciones = require('../../../utils/functions/Other/Operations.function')
const register = require('../../../utils/functions/Ov/register.function')
const bulkCreate = require('../infrastructure/repositories/bulkCreate.repository')
const gestionarData = async (data) => {
  const records = []
  for (const element of data) {
    const temp = await register(element)
    records.push(temp)
  }
  return records
}
const { sequelize } = require('../../../database/models')
module.exports = async () => {
  console.log('registrar las Ovs de dias anteriores')
  const _Operaciones = new Operaciones()
  return sequelize.transaction(async (t) => {
    let  _listPending = await listPending(t)
    _listPending = _Operaciones.sequelizeJson(_listPending)
    console.log('listPending',_listPending.length)
    if(_listPending.length > 0){
      const records = await gestionarData(_listPending).catch(e => {
        console.log('gestionarData',e)
        return []
      })
      await bulkCreate(t,records)
      return {
        message:'success'
      }
    }
    return {
        message:'no hay registros' 
    }    
  })
}