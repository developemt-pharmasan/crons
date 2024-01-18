const { sequelize } = require('../../../../database/models')
module.exports = async () => {
  return sequelize.query('SELECT "TextJson", "Id" FROM sap_sync."ODLN_SYNC" where "Status" in (1)  and "DocNum" is null', {
    type: sequelize.QueryTypes.SELECT
  })
}