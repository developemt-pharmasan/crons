const { OinvSyncSegupharma } = require('../../../../database/models')
module.exports = async (data, options) => {
  return OinvSyncSegupharma.update(data, options)
}