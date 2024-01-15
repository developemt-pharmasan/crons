const { PagosSync } = require('../../../../database/models')
module.exports = async (data, {Id}) => {
  const _data = {
    ServicelayerResponse: JSON.stringify(data)
  }
  if(data.DocNum) {
    _data.Status = 2
    _data.DocNum = data.DocNum
    _data.DocEntry = data.DocEntry
  } else {
    _data.Status = 3
  }  
  return PagosSync.update(_data,{
    where:{
      Id
    }
  })
}