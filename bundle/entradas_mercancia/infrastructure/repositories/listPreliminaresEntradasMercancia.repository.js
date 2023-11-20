const { sequelize } = require('../../../../database/models')

module.exports = async () => {
  return sequelize.query(`
    SELECT 
      "TextJson",
      "Id",
      "DocNum"
    FROM sap_business."RCP_ENT_MERC_CAB"
    WHERE "Estado" IN (1)
    AND "DocNum" IS NULL
    LIMIT 10 
  `, {
    type: sequelize.QueryTypes.SELECT
  })
}