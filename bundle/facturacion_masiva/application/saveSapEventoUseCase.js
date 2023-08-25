const factMaxDetEvt = require('../infrastructure/repository/facturacionMasivaEvt.repository')
const axios = require("axios");
const {sequelize} = require("../../../database/models");
const updateRepository = require("../infrastructure/repository/updateFacturacionMasivaResponseSapRepository");
const updateFacturacionMasivaResponseDetalleOvSapRepository = require("../infrastructure/repository/updateFacturacionMasivaResponseDetalleOvSapRepository");
module.exports = () => {
  return factMaxDetEvt().then(async (factura) => {
    if(!factura)  return console.log('NO HAY FACTURAS EVENTO POR ENVIAR A SAP')
    const options = {
      method: 'POST',
      url: process.env.FACTURACION_HOST,
      headers: { 'Content-Type': 'application/json' },
      data: factura.json
    };
    const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = true where id = ${factura.id}`
    await sequelize.query(sql)
    console.log('procesando id----', factura.id)
    return  axios.request(options).then(async (responseSap) => {
      await updateRepository({
        id: factura.id,
        NumFacturaResponse: responseSap.data.DocNum ? responseSap.data.DocNum : null,
        response: responseSap.data.Descripcion,
        estado: responseSap.data.DocNum ? 1 : 2,
        serviceLayer: false
      })
      await updateFacturacionMasivaResponseDetalleOvSapRepository({
        facturacionMasivaDetalleId: factura.id,
        NumFactura: responseSap.data.DocNum ? responseSap.data.DocNum : null,
        Comentarios: responseSap.data.Descripcion,
        Estado: responseSap.data.DocNum ? 1 : 2
      })
      console.log("FACTURA DE EVENTO GENERADA...",responseSap.data ? responseSap.data : " FALLO ");
    }).catch((error) => {
      if (error.response) {
          // console.log(error.response.data);
          const mensage = error.response.data.Descripcion ?? 'ERROR: code: 666 ; message: Problemas para conectar con SAP'
          const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = false, "estado" = 2, "response"  = '${mensage}' where id = ${factura.id} and "NumFacturaResponse" is null`
          sequelize.query(sql)
          const sql1 = `update "FacturacionMasivaDetalleOVs" set  "Estado" = 2, "Comentarios"  = '${mensage}'   where "facturacionMasivaDetalleId" = ${factura.id} and "NumFactura" is null`
          sequelize.query(sql1)
      } else if (error.request) {
        // console.log(error.request);
        const mensage = error.request.message ?? 'ERROR: code: 666 ; message: Problemas para conectar con SAP'
        const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = false, "estado" = 2, "response"  = '${mensage}' where id = ${factura.id} and "NumFacturaResponse" is null`
        sequelize.query(sql)
        const sql1 = `update "FacturacionMasivaDetalleOVs" set  "Estado" = 2, "Comentarios"  = '${mensage}'   where "facturacionMasivaDetalleId" = ${factura.id} and "NumFactura" is null`
        sequelize.query(sql1)
      } else {
        // console.log('Error', error.message);
        const mensage = error.message
        const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = false, "estado" = 2, "response"  = '${mensage}' where id = ${factura.id} and "NumFacturaResponse" is null`
        sequelize.query(sql)
        const sql1 = `update "FacturacionMasivaDetalleOVs" set  "Estado" = 2, "Comentarios"  = '${mensage}'   where "facturacionMasivaDetalleId" = ${factura.id} and "NumFactura" is null`
        sequelize.query(sql1)
      }
    })
  })
}