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
    invoices.create(JSON.parse(item.TextJson)).then((response) => {
      let data = {}
      if(response.DocNum){
          data.DocNum = response.DocNum,
          data.DocEntry = response.DocEntry,
          data.ServiceLayerResponse = JSON.stringify(response),
          data.Status = 2
          data.UpdatedAt = new Date()
      } else {
        let _message = response.message.includes('[SAP AG][LIBODBCHDB SO][HDBODBC] General error;1299 no data found:') ? 'La ov ya se encuentra facturada' : response.message
          data.ServiceLayerResponse = JSON.stringify({ message:  _message})
          data.Status = 3
          data.UpdatedAt = new Date()
      }
      updatedStatus(data, 
      {
        where: {
          Id: item.Id,
        }
      })
    }).catch((error) => {
      console.log('DIO ERROR',error)
      updatedStatus({
          ServiceLayerResponse: error.message,
          Status: 3,
          UpdatedAt: new Date()
        },
        {
          where: {
            Id: item.Id,
          }
        })
    })
  }
}