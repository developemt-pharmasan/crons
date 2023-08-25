const axios = require('axios');
const baseurl = process.env.SERVICE_LAYER_HOST
class Orders {
  constructor(){
    
  }
  create(data){
    return axios.post(`${baseurl}/orders`, data, {
      headers: {
        'Content-Type': 'application/json',
        'company': process.env.SERVICE_SLAYER_COMPANY,
        'module': 'ORDR',
        'type': 'orders',
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
      .catch((err) => {
        console.log('catch',err)
        const {response,message} = err
        const msj = response.data ? response.data.error.message.value : message;
        return {
          message: msj,
          status: response.status || 500,
        }
      })
  }
}
module.exports = Orders