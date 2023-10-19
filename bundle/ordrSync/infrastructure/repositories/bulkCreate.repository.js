const { OrdrSync } = require('../../../../database/models')
module.exports = async (transaction,records) => {
  return OrdrSync.bulkCreate(records, { transaction })
}