const { Ov, sequelize } = require('../../../../database/models');
const { Op } = require('sequelize');
module.exports = async (transaction) => {
  return Ov.findAll({
    where:{
      [Op.all]: sequelize.literal('"Ov"."Id" not in (select "NumOv" from sap_sync."ORDR_SYNC")'),
      DocStatus: {
        [Op.in]: [
          0,1
        ]
      },
      FechaContabilizacion:{
        [Op.lte]: sequelize.literal('CURRENT_DATE - 1')
      }
    },
    include:[
      {
        association: 'DocumentLines',
        include:[
          {
            association: 'Ips',
          },
          {
            association: 'Medico',
          }
        ]
      }
    ],
    transaction
  })
}