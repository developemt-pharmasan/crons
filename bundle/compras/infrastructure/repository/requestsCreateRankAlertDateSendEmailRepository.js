const path = require('path')
const fs = require('fs')
const dayjs = require('dayjs')
const { sequelize, Sequelize } = require('../../../../database/models/index')
module.exports = async () => {
  const sql = fs.readFileSync(path.resolve(__dirname, '.', 'sql', 'requestsCreateRankAlertDateSendEmail.sql'), 'utf8')
  const options = {
    type: Sequelize.QueryTypes.SELECT,
    replacements: {
      dayActually: dayjs().get('D'),
      dateActually: dayjs().format('YYYY-MM-DD'),
    }
  }
  return await sequelize.query(sql, options)
}