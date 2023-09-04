const { sequelize } = require('../../../../database/models')
module.exports = async () => {
  // console.log('execute query')
  return sequelize.query('SELECT "TextJson","NumOv", "Id" FROM sap_sync."ORCT_SYNC" where "Status" in (1,3)  and "DocNum" is null', {
    type: sequelize.QueryTypes.SELECT
  })
}