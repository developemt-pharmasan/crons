const {Sequelize, sequelize} = require("../../../../database/models");
module.exports = async () => {
  const options = {
    type: Sequelize.QueryTypes.SELECT,
    replacements: {},
    plain: true
  }
  const rest = await sequelize.query(`
  select * from sap_business."OV_SYNC" 
  where "Status" = 0 
  and (select count(s1."Id") from sap_business."OV_SYNC" s1 where s1."Status" = 1 ) = 0
  limit 1
`, options)
  return rest
}
