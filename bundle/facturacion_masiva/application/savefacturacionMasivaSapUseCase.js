const repository = require('../infrastructure/repository/listarFacturacionMasivaRepository')
const updateRepository = require('../infrastructure/repository/updateFacturacionMasivaResponseSapRepository')
const {Sequelize, sequelize} = require('../../../database/models')
const updateFacturacionMasivaResponseDetalleOvSapRepository = require('../infrastructure/repository/updateFacturacionMasivaResponseDetalleOvSapRepository')
const axios = require("axios");
module.exports = () => {
  return repository().then(async facturacioMasivasDetalle => {
    if(!facturacioMasivasDetalle)  return console.log('NO HAY FACTURAS CAPITA POR ENVIAR A SAP')
    if(!facturacioMasivasDetalle.length)  return console.log('NO HAY FACTURAS CAPITA POR ENVIAR A SAP')
    let promises = []
    for (const item of facturacioMasivasDetalle) {
      const options = {
        method: 'POST',
        url: process.env.FACTURACION_HOST,
        headers: { 'Content-Type': 'application/json' },
        data: item.json
      };
      
      const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = true where id = ${item.id}`
      await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT
      })
      console.log('procesando id----', facturacioMasivasDetalle)
      
      const responseSap = await axios.request(options)
      .catch((error) => {
        // console.error(error.response, 'error.response');
        const responseDetalle = updateRepository({
          id: item.id,
          NumFacturaResponse: null,
          response: error.response.data.Descripcion,
          estado: 2,
          serviceLayer: false
        })
        promises.push(responseDetalle)

        const responseDetalleOv = updateFacturacionMasivaResponseDetalleOvSapRepository({
          facturacionMasivaDetalleId: item.id,
          NumFactura: null,
          Comentarios: error.response.data.Descripcion,
          Estado: 2
        })
        promises.push(responseDetalleOv)

      });

      if (responseSap) {

        const responseDetalle = updateRepository({
          id: item.id,
          NumFacturaResponse: responseSap.data.DocNum ? responseSap.data.DocNum : null,
          response: responseSap.data.Descripcion,
          estado: responseSap.data.DocNum ? 1 : 2,
          serviceLayer: false
        })
        promises.push(responseDetalle)
        const responseDetalleOv = updateFacturacionMasivaResponseDetalleOvSapRepository({
          facturacionMasivaDetalleId: item.id,
          NumFactura: responseSap.data.DocNum ? responseSap.data.DocNum : null,
          Comentarios: responseSap.data.Descripcion,
          Estado: responseSap.data.DocNum ? 1 : 2
        })

        console.log("FACTURA DE CAPITA GENERADA...",responseSap.data ? responseSap.data : " FALLO ");
        promises.push(responseDetalleOv)

      }
    }

    Promise.all(promises).then((res) =>{
      //console.log(res);
    })

  }).catch(err => console.error(err))
}



