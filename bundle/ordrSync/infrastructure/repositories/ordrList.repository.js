const { sequelize } = require('../../../../database/models')
module.exports = async () => {
  return sequelize.query('SELECT "TextJson","NumOv", "Id" FROM sap_sync."ORDR_SYNC" where "Status" in (1)', {
    type: sequelize.QueryTypes.SELECT
  })
}