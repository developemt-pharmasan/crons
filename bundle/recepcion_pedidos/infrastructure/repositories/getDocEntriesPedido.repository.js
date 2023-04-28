const env = process.env.NODE_ENV || 'development';
const config = require('../../../../config/typeorm.config')[env];
module.exports = (conn, idsDetalleRecepcion) => {
  const sql = `
    SELECT DISTINCT "id", "BaseEntry", "BaseLine"  FROM ${config.schema}.RECEPCION_PEDIDOS_DETALLE WHERE "id" IN (${idsDetalleRecepcion.join(',')})
  `
  return conn.manager.query(sql)
}