const path = require('path')
const  fs = require('fs')
module.exports = async (Postgres) => {  
  const sql = fs.readFileSync(path.resolve(__dirname,'.','sql','nexShedulePayments.sql'),'utf8')
  const options = {
    type: Postgres.QueryTypes.SELECT,
    replacements:{
      startDate: '2021-08-01',
      finishDate: '2021-08-31'
    }
  }
  return  await Postgres.query(sql, options)
}