const repository = require('../infrastructure/repository/listarFacturacionMasivaRepository')
const updateRepository = require('../infrastructure/repository/updateFacturacionMasivaResponseSapRepository')
const axios = require("axios");

module.exports = () => {
  return repository().then(async detalles => {
    console.log(detalles, 'responseeeee');
    let promises = []
    for (const item of detalles) {
      const options = {
        method: 'POST',
        // url: 'http://192.168.1.4:13027/Api/DocumentMarketing',
        url: process.env.FACTURACION_HOST,
        headers: { 'Content-Type': 'application/json' },
        data: item.json
      };
      
      const responseSap = await axios.request(options)
      .catch((error) => {
        console.error(error.response, 'error.response');
        const responseDetalle = updateRepository({
          id: item.id,
          NumFactura: null,
          Comentarios: error.response.data.Descripcion,
          Estado: 2
        })
        promises.push(responseDetalle)
      });

      console.log(responseSap, 'responseSap');

      if (responseSap) {
        const responseDetalle = updateRepository({
          id: item.id,
          NumFactura: responseSap.data.DocNum ? responseSap.data.DocNum : null,
          Comentarios: responseSap.data.Descripcion,
          Estado: responseSap.data.DocNum ? 1 : 2
        })
        promises.push(responseDetalle)
      }
    }

    Promise.all(promises).then(res=>{
      console.log(res);
    })

  }).catch(err => console.error(err))
}



