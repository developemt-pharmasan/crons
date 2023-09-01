const { sequelize } = require('../../../../database/models')
module.exports = async () => {
  // console.log('execute query')
  return sequelize.query('SELECT "TextJson","NumOv", "Id" FROM sap_business."ORDR_SYNC" where "Status" in (1) limit 60 ', {
    type: sequelize.QueryTypes.SELECT
  })
}