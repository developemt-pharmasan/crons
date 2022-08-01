const {Sequelize, sequelize} = require("../../../../database/models");
module.exports = async () => {
  console.log({ conn: sequelize.config })
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
    and (
      select count(s1."id") 
      from "FacturacionMasivaDetalles" s1
      inner join "FacturacionMasivas" s2 on s1."facturacionMasivaId" = s2."id" and s2."tipoFacturacionMasiva" in (1)
      where s1."serviceLayer" = true  and (s1."estado" = 0 or s1."estado" is null)
    ) = 0
    order by t0."id"
    limit 1
  `, options)
}