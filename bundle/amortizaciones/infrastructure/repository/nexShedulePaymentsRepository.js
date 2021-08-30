const path = require('path')
const  fs = require('fs')
const dayjs = require('dayjs')
module.exports = async (Postgres) => {  
  const sql = fs.readFileSync(path.resolve(__dirname,'.','sql','nexShedulePayments.sql'),'utf8')
  const options = {
    type: Postgres.QueryTypes.SELECT,
    replacements:{
      startDate: dayjs().format('YYYY-MM-DD'),
      finishDate: dayjs().add(7, 'day').format('YYYY-MM-DD')
    }
  }
  return  await Postgres.query(sql, options)
}