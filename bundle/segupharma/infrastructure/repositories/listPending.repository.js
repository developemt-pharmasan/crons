const { sequelize } = require('../../../../database/models')
const queryString = 'select "Id", "TextJson" from sap_segupharma."OINV_SYNC" where "Status" = 1 limit 1'; 
module.exports = async () => {
  return sequelize.query(queryString, { type: sequelize.QueryTypes.SELECT })
}