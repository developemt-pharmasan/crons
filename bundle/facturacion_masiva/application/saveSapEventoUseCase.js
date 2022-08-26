const factMaxDetEvt = require('../infrastructure/repository/facturacionMasivaEvt.repository')
const axios = require("axios");
const {sequelize, Sequelize} = require("../../../database/models");
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
    // const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = true where id = ${factura.id}`
    // await sequelize.query(sql)
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
    }).catch((err) => {
      if(err.response){
        //console.log({err1: err.response})
        const mensage = err.response.data.Descripcion
        const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = false, "estado" = 2, "response"  = '${mensage}' where id = ${factura.id}`
        sequelize.query(sql)
        const sql1 = `update "FacturacionMasivaDetalleOVs" set  "Estado" = 2 where "facturacionMasivaDetalleId" = ${factura.id}`
        sequelize.query(sql1)
      } else {
        console.log({err})
        const mensage = JSON.stringify(err)
        const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = false, "estado" = 2, "response"  = '${mensage}' where id = ${factura.id}`
        sequelize.query(sql)
        const sql1 = `update "FacturacionMasivaDetalleOVs" set  "Estado" = 2 where "facturacionMasivaDetalleId" = ${factura.id}`
        sequelize.query(sql1)
      }
      return null
    })
  })
}