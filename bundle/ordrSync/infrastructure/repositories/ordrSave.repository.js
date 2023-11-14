const { OrdrSync } = require('../../../../database/models')
const { Op } = require("sequelize");
module.exports = async (data, {Id}) => {
  // console.log('DocNum', data.DocNum)
  return OrdrSync.update({
    Status: data.DocNum ? 2 : 3,
    ServicelayerResponse: JSON.stringify(data),
    DocNum: data.DocNum ?? null,
    DocEntry: data.DocEntry ?? null,
  },{
    where:{
      Id,
      DocNum: {
        [Op.is]: null
      }
    }
  })
}