const path = require('path')
const fs = require('fs')
const { sequelize, Sequelize } = require('../../../../database/models/index')
module.exports = async ({ id, NumFactura, Comentarios, Estado }) => {
  const sql = fs.readFileSync(path.resolve(__dirname, '.', 'sql', 'updateFacturacionMasivaResponseSap.sql'), 'utf8')
  const options = {
    type: Sequelize.QueryTypes.SELECT,
    replacements: {
      NumFactura,
      Comentarios,
      Estado,
      id,
    }
  }
  return await sequelize.query(sql, options)
}