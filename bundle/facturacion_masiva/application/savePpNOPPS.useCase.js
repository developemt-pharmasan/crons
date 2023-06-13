const factMaxDetEvt = require('../infrastructure/repository/facturacionPpNOPPS.repository')
const axios = require("axios");
const {sequelize} = require("../../../database/models");
const updateRepository = require("../infrastructure/repository/updateFacturacionMasivaResponseSapRepository");
const updateFacturacionMasivaResponseDetalleOvSapRepository = require("../infrastructure/repository/updateFacturacionMasivaResponseDetalleOvSapRepository");
module.exports = async () => {
  return await factMaxDetEvt().then(async factura => {
    console.log('factura--------->', factura)
    if(!factura)  throw new Error('NO HAY FACTURAS EVENTO POR ENVIAR A SAP')
    const detalle = factura
    const options = {
      method: 'POST',
      url: `${process.env.SERVICE_LAYER_HOST}/invoices`,
      headers: { 'Content-Type': 'application/json', 'company': 'PRUEBAS_PHARMA', 'module': 'Facturacion masiva', 'type': 'Invoices' },
      data: factura.json
    };
    console.log('options-------->', options)
    const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = true where id = ${detalle.id}`
    console.log('FACTURANDO ID -->', detalle.id)
    // return sequelize.query(sql)
    await sequelize.query(sql)
    const actualizarService = () => {
      return sequelize.query(sql)
    }
    actualizarService().then(() => {
      return axios.request(options).then(async (responseSap) => {
        console.log('RESPOSE SAP---->', responseSap.data)
        await updateRepository({
          id: detalle.id,
          NumFacturaResponse: responseSap.data.DocNum ? responseSap.data.DocNum : null,
          response: responseSap.data.DocNum ? 'OK' :responseSap.data.statusText,
          estado: responseSap.data.DocNum ? 1 : 2,
          serviceLayer: false
        })
        await updateFacturacionMasivaResponseDetalleOvSapRepository({
          facturacionMasivaDetalleId: detalle.id,
          NumFactura: responseSap.data.DocNum ? responseSap.data.DocNum : null,
          Comentarios: responseSap.data.DocNum ? 'OK' :responseSap.data.statusText,
          Estado: responseSap.data.DocNum ? 1 : 2
        })
        console.log("FACTURA DE EVENTO GENERADA...",responseSap.data ? responseSap.data : " FALLO ");
      }).catch((error) => {
        console.log('ENTRO POR EL CATCH--->', error.response.data.message)
        if (error.response) {
            // console.log(error.response.data);
            const mensage = error.response.data.message ?? 'ERROR: code: 666 ; message: Problemas para conectar con SAP'
            const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = false, "estado" = 2, "response"  = '${mensage}' where id = ${detalle.id} and "NumFacturaResponse" is null`
            sequelize.query(sql)
            const sql1 = `update "FacturacionMasivaDetalleOVs" set  "Estado" = 2, "Comentarios"  = '${mensage}'   where "facturacionMasivaDetalleId" = ${detalle.id} and "NumFactura" is null`
            sequelize.query(sql1)
        } else if (error.request) {
          // console.log(error.request);
          const mensage = error.request.message ?? 'ERROR: code: 666 ; message: Problemas para conectar con SAP'
          const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = false, "estado" = 2, "response"  = '${mensage}' where id = ${detalle.id} and "NumFacturaResponse" is null`
          sequelize.query(sql)
          const sql1 = `update "FacturacionMasivaDetalleOVs" set  "Estado" = 2, "Comentarios"  = '${mensage}'   where "facturacionMasivaDetalleId" = ${detalle.id} and "NumFactura" is null`
          sequelize.query(sql1)
        } else {
          // console.log('Error', error.message);
          const mensage = error.message
          const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = false, "estado" = 2, "response"  = '${mensage}' where id = ${detalle.id} and "NumFacturaResponse" is null`
          sequelize.query(sql)
          const sql1 = `update "FacturacionMasivaDetalleOVs" set  "Estado" = 2, "Comentarios"  = '${mensage}'   where "facturacionMasivaDetalleId" = ${detalle.id} and "NumFactura" is null`
          sequelize.query(sql1)
        }
      })
    })
  })
}