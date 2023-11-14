const path = require('path')
const fs = require('fs')
const { sequelize, Sequelize } = require('../../../../database/models/index')
module.exports = async ({ Id, estado, DocEntry, DocNum, ServicelayerResponse }) => {
  const sql = fs.readFileSync(path.resolve(__dirname, '.', 'sql', 'updateSyncEntregasMasivas.sql'), 'utf8')
  const options = {
    type: Sequelize.QueryTypes.SELECT,
    replacements: {
      Id,
      ServicelayerResponse,
      estado,
      DocEntry,
      DocNum
    }
  }
  return await sequelize.query(sql, options)
}