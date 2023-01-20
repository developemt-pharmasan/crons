const path = require('node:path')
const fs = require('node:fs')
const { sequelize, Sequelize } = require('../../../../database/models/index')
module.exports = async () => {  
  const sql = fs.readFileSync(path.resolve(__dirname, '.', 'sql', 'listarFacturacionMasiva.sql'), 'utf8')
  const options = {
    type: Sequelize.QueryTypes.SELECT,
    replacements: {}
  }
  return await sequelize.query(sql, options)
}