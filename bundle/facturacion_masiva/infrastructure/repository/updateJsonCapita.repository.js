const path = require('path')
const fs = require('fs')
const { sequelize, Sequelize } = require('../../../../database/models/index')
module.exports = async (id, informacion) => {
  const sql = fs.readFileSync(path.resolve(__dirname, '.', 'sql', 'updateJsonCapita.sql'), 'utf8')
  const options = {
    type: Sequelize.QueryTypes.SELECT,
    replacements: {
      id,
      informacion
    }
  }
  return await sequelize.query(sql, options)
}