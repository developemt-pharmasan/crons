const path = require('path')
const fs = require('fs')
const { sequelize, Sequelize } = require('../../../../database/models/index')
module.exports = async ({ NumFactura, Comentarios, Estado, facturacionMasivaDetalleId }) => {
  const sql = fs.readFileSync(path.resolve(__dirname, '.', 'sql', 'updateFacturacionMasivaDetalleOvResponseSap.sql'), 'utf8')
  const options = {
    type: Sequelize.QueryTypes.SELECT,
    replacements: {
      NumFactura,
      Comentarios,
      Estado,
      facturacionMasivaDetalleId,
    }
  }
  return await sequelize.query(sql, options)
}