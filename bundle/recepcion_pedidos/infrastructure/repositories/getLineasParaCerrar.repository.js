const env = process.env.NODE_ENV || 'development';
const config = require('../../../../config/typeorm.config')[env];
module.exports = (conn, DocEntryPedido, mds) => {
  const sql = `
    SELECT 
        T0."LineNum",
        (
            CASE
                WHEN
                    (
                        "Quantity" - 
                        (
                            SELECT sum(S1."Quantity")
                            FROM ${config.dbSap}.PDN1 S1
                            INNER JOIN ${config.schema}.RECEPCION_PEDIDOS_DETALLE S2 ON S2."id" = S1."U_PHR_IdDocReferencia"
                            WHERE S2."BaseEntry" = T0."DocEntry" AND S2."BaseLine" = T0."LineNum"
                            /*excluir entradas con devoluciones activas */
                            AND S1."DocEntry" NOT IN 
                                (
                                    SELECT F1."BaseEntry"
                                    FROM ${config.dbSap}.RPD1 F1
                                    INNER JOIN ${config.dbSap}.ORPD F2 ON F2."DocEntry" = F1."DocEntry"
                                    WHERE F1."BaseEntry" = S1."DocEntry" AND F2.CANCELED = 'N'
                                )
                        )
                    ) <= 0 THEN 'bost_Close'
                ELSE 'bost_Open'
            END
        ) "LineStatus"
    FROM ${config.dbSap}.POR1 T0
    WHERE T0."DocEntry" = ${DocEntryPedido}
    and T0."ItemCode" in ('${mds.join("','")}')`
  return conn.manager.query(sql)
}
