const env = process.env.NODE_ENV || 'development';
const config = require('../../../../config/typeorm.config')[env];
module.exports = (conn) => {
  const sql = `
    SELECT T0."DocEntry", CAST(T0."json" AS VARCHAR) AS "json"  
        FROM ${config.schema}.RECEPCION_PEDIDOS_CABECERA T0 
        JOIN ${config.schema}.RECEPCION_PEDIDOS_DETALLE T1 ON T1."DocEntry" = T0."DocEntry" 
        WHERE 
            T0."estado" = 1 
          AND T0."deletedAt" IS NULL
          AND T1."id" NOT IN 
            ( 
                SELECT S1."U_PHR_IdDocReferencia" 
                FROM ${config.dbSap}.PDN1 S1 
                INNER JOIN ${config.dbSap}.OPDN S2 ON S2."DocEntry" = S1."DocEntry" 
                WHERE S2.CANCELED = 'N' AND  S1."U_PHR_IdDocReferencia" IS NOT NULL
                AND S1."DocEntry" NOT IN 
                    (
                        SELECT F1."BaseEntry"
                        FROM ${config.dbSap}.RPD1 F1
                        INNER JOIN ${config.dbSap}.ORPD F2 ON F2."DocEntry" = F1."DocEntry"
                        WHERE F1."BaseEntry" = S1."DocEntry" AND F2.CANCELED = 'N'
                    )
            )
          AND T0."DocNum" IS NULL
         GROUP BY T0."DocEntry",CAST(T0."json" AS VARCHAR)`
  return conn.manager.query(sql)
}