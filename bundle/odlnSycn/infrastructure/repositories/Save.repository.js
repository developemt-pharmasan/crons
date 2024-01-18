const { OdlnSync } = require('../../../../database/models')
module.exports = async (data, {Id}) => {
  let _data = {}
  if(data.DocNum) {
    _data.Status = 2
    _data.DocNum = data.DocNum
    _data.DocEntry = data.DocEntry
  } else {
    _data.Status = 3
    _data.ErrorResponse = data.message
  }
  return OdlnSync.update(_data,{
    where:{
      Id
    }
  })
}