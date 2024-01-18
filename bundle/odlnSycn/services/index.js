const axios = require('axios');
const baseurl = process.env.SERVICE_LAYER_HOST
class DeliveryNotes {
  constructor(){
    
  }
  create(data){
    return axios.post(`${baseurl}/deliveries`, data, {
      headers: {
        'Content-Type': 'application/json',
        'company': process.env.SERVICE_SLAYER_COMPANY,
        'module': 'DeliveryNotes',
        'type': 'DeliveryNotes',
      }
    })
      .then(({status,data}) => {
        return {
          status,
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
module.exports = DeliveryNotes