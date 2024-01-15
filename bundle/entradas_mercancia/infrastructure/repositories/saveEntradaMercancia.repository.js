const { Rcp_ent_merc_cab } = require('../../../../database/models')

module.exports = async (data, {Id}) => {
  return Rcp_ent_merc_cab.update({
    Estado: data.DocNum ? 2 : 3,
    ServiceLayerResponse: JSON.stringify(data),
    DocNum: data.DocNum ?? null,
    DocEntry: data.DocEntry ?? null,
  },{
    where:{
      Id
    }
  })
}