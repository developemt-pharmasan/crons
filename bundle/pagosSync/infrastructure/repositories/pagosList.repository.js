const { sequelize } = require('../../../../database/models')
module.exports = async () => {
  return sequelize.query('SELECT "TextJson","NumOv", "Id", "Consignacion" FROM sap_sync."ORCT_SYNC" where "Status" in (1,3) ', {
    type: sequelize.QueryTypes.SELECT
  })
}