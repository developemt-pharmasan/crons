const orm = require('../database/orm/raw.orm')
const axios = require('axios')
module.exports = async (url, method = 'GET', data = {}) => {
        // const { data: response } = await
         return axios.request({ method, url, data }).then(({data}) => {
            return data
         })
        .catch(function (error) {
            var e = null
            if (error.response) {
                e = error.response.data
            //   console.log(error.response.data);
            } else if (error.request) {
                e = error.request
            //   console.log(error.request);
            } else {
                e = error.message
            //   console.log('Error', error.message);
            }
            return e
            // console.log(error.config);
          });
        // console.log('********response:********* ', response)
            // return response ? response : null

}