const {Sequelize, sequelize} = require("../../../../database/models");
module.exports = async () => {
  const options = {
    type: Sequelize.QueryTypes.SELECT,
    replacements: {},
    plain: true
  }
  return await sequelize.query(`
    select 
    t0.*
    from "FacturacionMasivaDetalles" t0
    inner join "FacturacionMasivas" t1 on t0."facturacionMasivaId" = t1."id" and t1."tipoFacturacionMasiva" in (1)
    where (t0."estado" = 0 or t0."estado" is null)
    order by t0."id"
    limit 1
  `, options)
}