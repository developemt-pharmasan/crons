const syncEntregasMasivas = require('../infrastructure/repository/syncEntregasMasivas.repository')
const axios = require("axios");
const {sequelize} = require("../../../database/models");
const updateRepository = require("../infrastructure/repository/updateSyncEntregaMasivaRepository");
module.exports = async () => {
  return await syncEntregasMasivas().then(async item => {
    if(!item) return console.log('NO HAY ENTREGAS POR ENVIAR A SAP')
    console.log('los items--------->', item)
    const detalle = item
    const options = {
      method: 'POST',
      url: `${process.env.SERVICE_LAYER_HOST}/deliveries`,
      headers: { 'Content-Type': 'application/json', 'company': 'PRUEBAS_PHARMA', 'module': 'Entregas Masivas', 'type': 'Deliveries' },
      data: item.TextJson
    };
    const sql = `update sap_business."OV_SYNC" set "Status" = 1 where "Id" = ${detalle.Id}`
    await sequelize.query(sql)
    const actualizarService = () => {
      return sequelize.query(sql)
    }
    await actualizarService().then(() => {
      return axios.request(options).then(async (responseSap) => {
        console.log('RESPONSE SAP---->', responseSap)
        await updateRepository({
          Id: detalle.Id,
          ServicelayerResponse: responseSap.data.DocNum ? 'OK' :responseSap.data.statusText,
          estado: responseSap.data.DocNum ? 2 : 3,
          DocEntry: responseSap.data.DocEntry ? responseSap.data.DocEntry : null,
          DocNum: responseSap.data.DocNum ? responseSap.data.DocNum : null
        })
        console.log("ENTREGA GENERADA...",responseSap.data ? responseSap.data : " FALLÓ ");
      }).catch((error) => {
        console.log('ENTRO POR EL CATCH--->', error)
        if (error.response) {
          console.log(error.response.data);
          const mensage = error.response.data.message ?? 'ERROR: code: 666 ; message: Problemas para conectar con SAP'
          const sql = `update sap_business."OV_SYNC" set "Status" = 3, "ServicelayerResponse"  = '${mensage.replace(/'/g, '')}' where "Id" = ${detalle.Id}`
          sequelize.query(sql)
        } else if (error.request) {
          // console.log(error.request);
          const mensage = error.request.message ?? 'ERROR: code: 666 ; message: Problemas para conectar con SAP'
          const sql = `update sap_business."OV_SYNC" set "Status" = 3, "ServicelayerResponse"  = '${mensage.replace(/'/g, '')}' where "Id" = ${detalle.Id} `
          sequelize.query(sql)
        } else {
          const sql = `update sap_business."OV_SYNC" set "Status" = 3, "ServicelayerResponse"  = 'Error desconocido' where "Id" = ${detalle.Id} `
          sequelize.query(sql)
        }
      })
    })
    console.log('terminó el proceso---------')
  })
}