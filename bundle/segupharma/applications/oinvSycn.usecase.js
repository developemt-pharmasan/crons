const { Sequelize } = require('../../../database/models')
const { Op } = Sequelize
const listPending = require('../infrastructure/repositories/listPending.repository')
const updatedStatus = require('../infrastructure/repositories/updatedStatus.repository')
const Invoices = require('../services/index')
const invoices = new Invoices()
module.exports = async () => {
  const _listPending  = await listPending()
  console.log('_listPending', _listPending.length)
  for (const item of _listPending) {
    console.log(JSON.parse(item.TextJson))
    // invoices.create(JSON.parse(item.TextJson)).then((response) => {
    //   updatedStatus({
    //     DocNum: response.DocNum,
    //     DocEntry: response.DocEntry, 
    //     ServiceLayerResponse: JSON.stringify(response),
    //     Status: 2, 
    //     UpdatedAt: new Date()
    //     }, 
    //   {
    //     where: {
    //       Id: item.Id,
    //         DocNum: {
    //         [Op.eq]: null
    //       }
    //     }
    //   })
    // }).catch((error) => {
    //   updatedStatus({
    //       ServiceLayerResponse: error.message,
    //       Status: 3,
    //       UpdatedAt: new Date()
    //     },
    //     {
    //       where: {
    //         Id: item.Id,
    //         DocNum: {
    //           [Op.eq]: null
    //         }
    //       }
    //     })
    // })
  }
}