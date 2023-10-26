const axios = require('axios');
const baseurl = process.env.SERVICE_LAYER_HOST
class Invoices {
  create(data){
    return axios.post(`${baseurl}/invoices`, data, {
      headers: {
        'Content-Type': 'application/json',
        'company': 'UT_SAS',
        'module': 'Facturacion masiva',
        'type': 'invoices',
      }
    })
      .then(({status,statusText,data}) => {
        return {
          status,
          statusText,
          DocEntry: data.DocEntry,
          DocNum: data.DocNum,
        }
      })
      .catch((error) => {
        if (error.response) {
          return {
            message: error.response.data.message,
            status: error.response.status || 500,
          }
        } else if (error.request) {
          return {
            message: JSON.stringify(error.request),
            status: 500,
          }
        } else {
          return {
            message: error.message,
            status: 500,
          }
        }
      })
  }
}
module.exports = Invoices