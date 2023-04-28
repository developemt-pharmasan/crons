const DataSource = require("../../../../database/typeorm");
const {RECEPCION_PEDIDOS_CABECERA} = require('../../../../database/typeorm/models/recepcionpedidocabecera')

module.exports = async (payload) => {
  const conn = await DataSource();
  if (conn) {
    return await conn.manager.transaction(async (transaction) => {
      const Repository = await transaction.getRepository(RECEPCION_PEDIDOS_CABECERA)
      return await Repository.update(
        {
          DocEntry: payload.idRecepcion
        },
        {
          estado: payload.estado,
          MsjRespuesta: payload.MsjRespuesta,
          DocNum: payload.DocNum
        }
      );
    })
  }
  return {message: 'Error al conectar con sap'}
}