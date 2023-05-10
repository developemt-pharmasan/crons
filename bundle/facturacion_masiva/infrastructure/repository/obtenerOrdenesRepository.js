const path = require('path')
const fs = require('fs')
const { sequelize, Sequelize } = require('../../../../database/models/index')
module.exports = async (id) => {
  const sql = fs.readFileSync(path.resolve(__dirname, '.', 'sql', 'listarOrdenes.sql'), 'utf8')
  const options = {
    type: Sequelize.QueryTypes.SELECT,
    replacements: {
      id
    }
  }
  return await sequelize.query(sql, options)
}