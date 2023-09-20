const { sequelize } = require('../../../../database/models')
module.exports = async () => {
  return sequelize.query('SELECT "TextJson","NumOv", "Id" FROM sap_sync."ORDN_SYNC" where "Status" in (1) limit 60', {
    type: sequelize.QueryTypes.SELECT
  })
}