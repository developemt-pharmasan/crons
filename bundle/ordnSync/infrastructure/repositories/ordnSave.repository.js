const { OrdnSync } = require('../../../../database/models')
module.exports = async (data, {Id}) => {
  // console.log('DocNum', data.DocNum)
  return OrdnSync.update({
    Status: data.DocNum ? 2 : 3,
    ServicelayerResponse: JSON.stringify(data),
    DocNum: data.DocNum ?? null,
    DocEntry: data.DocEntry ?? null,
  },{
    where:{
      Id
    }
  })
}