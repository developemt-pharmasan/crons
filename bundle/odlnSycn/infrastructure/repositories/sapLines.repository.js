const { hanaQuery } = require('../../../../database/hanaClient')
module.exports = async (params) => {
  const arraySql = [
    `SELECT
      r."LineNum" AS "BaseLine",
      r."ItemCode",
      r."DocEntry" AS "BaseEntry",
      r."U_PG_IdOv" as"NumOv",
      r."U_PG_IdOvDt",
      o."DocNum",
      o."DocStatus" 
    FROM
      PHARMASAN_FINAL.RDR1 r
      INNER JOIN PHARMASAN_FINAL.ORDR o ON o."DocEntry" = r."DocEntry"
    WHERE
    r."LineStatus" = 'O' and 
    r."U_PG_IdOv" IN (`,
    params.map((x) => `${x.NumOv}`).join(','),
    ')'
  ]
  return hanaQuery(arraySql.join(''))
}