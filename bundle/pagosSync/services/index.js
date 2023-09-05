const axios = require('axios');
const baseurl = process.env.SERVICE_LAYER_HOST
class IncomingPayments {
  constructor(){
    
  }
  create(data){
    return axios.post(`${baseurl}/incoming-payments`, data, {
      headers: {
        'Content-Type': 'application/json',
        'company': process.env.SERVICE_SLAYER_COMPANY,
        'module': 'incoming-payments',
        'type': 'incoming-payments',
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
          // La petición fue hecha pero no se recibió respuesta
          // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
          return {
            message: JSON.stringify(error.request),
            status: 500,
          }
        } else {
          // Algo paso al preparar la petición que lanzo un Error
          return {
            message: error.message,
            status: 500,
          }
        }
      })
  }
}
module.exports = IncomingPayments