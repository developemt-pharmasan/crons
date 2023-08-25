const { sequelize } = require('../../../../database/models')
module.exports = async () => {
  // console.log('execute query')
  return sequelize.query('SELECT "TextJson","NumOv", "Id" FROM sap_business."PAGOS_SYNC" where "Status" in (1,3) ', {
    type: sequelize.QueryTypes.SELECT
  })
}