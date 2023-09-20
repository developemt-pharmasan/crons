const { sequelize } = require('../../../../database/models')
module.exports = async () => {
  return sequelize.query('SELECT "TextJson","NumOv", "Id", "Consignacion" FROM sap_sync."ORCT_SYNC" where "Status" in (1)  and "DocNum" is null limit 60 ', {
  type: sequelize.QueryTypes.SELECT
  })
}