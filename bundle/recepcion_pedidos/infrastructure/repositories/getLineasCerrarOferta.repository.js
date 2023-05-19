const env = process.env.NODE_ENV || 'development';
const config = require('../../../../config/typeorm.config')[env];
module.exports = async (conn, oferta) => {
  const sql = `
        SELECT 
            T0."LineNum",
            (
                CASE
                WHEN
                    (
                        T0."Quantity" - 
                        (
                            SELECT sum(S1."Quantity")
                            FROM ${config.dbSap}.POR1 S1
                            INNER JOIN ${config.schema}.DETALLADO_PEDIDO S2 ON S2."DocEntryPedido" = S1."DocEntry" AND S2."LineNumPedido" = S1."LineNum"
                            INNER JOIN ${config.dbSap}.OPOR S3 ON S3."DocEntry" = S1."DocEntry" AND S3.CANCELED = 'N'
                            WHERE S2."U_PHR_BaseEntry" = T0."DocEntry" AND S2."U_PHR_LineBase" = T0."LineNum"
                        )
                    ) <= 0 THEN 'bost_Close'
               ELSE 'bost_Open'
               END
            ) "LineStatus"
        FROM ${config.dbSap}.PQT1 T0
        WHERE T0."DocEntry" = ${oferta.DocOferta}
        and T0."LineNum" in (${oferta.lineasAsoc.join(',')})
  `
  return conn.manager.query(sql)
}