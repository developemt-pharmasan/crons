const env = process.env.NODE_ENV || 'development';
const config = require('../../../../config/typeorm.config')[env];
module.exports = (conn, pedido) => {
  const sql = `
    SELECT DISTINCT  
        T1."DocEntryOferta" AS "DocOferta", 
        T1."LineNumOferta" AS "LineOferta", 
        T1."U_PHR_BaseEntry" AS "DocSol" , 
        T1."U_PHR_LineBase" AS "LineSol"
    FROM ${config.schema}.DETALLADO_PEDIDO T0
           JOIN ${config.schema}.DETALLADO_OFERTA_COMPRA T1 ON T1."DocEntryOferta" = T0."U_PHR_BaseEntry" AND T1."LineNumOferta" = T0."U_PHR_LineBase"
    WHERE T0."DocEntryPedido" = ${pedido.BaseEntry} AND T0."LineNumPedido" IN (${pedido.numeroLineasAsociadas.join(',')})
  `
  return conn.manager.query(sql)
}

