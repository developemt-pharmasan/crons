const { EntitySchema } = require("typeorm");
const { RECEPCION_PEDIDOS_CABECERA } = require('../models/recepcionpedidocabecera')
module.exports = new EntitySchema({
    name: "RECEPCION_PEDIDOS_CABECERA",
    tableName: "RECEPCION_PEDIDOS_CABECERA",
    target: RECEPCION_PEDIDOS_CABECERA,
    columns: {
        DocEntry: {
            primary: true,
            type: "int",
            generated: true
        },
        DocNum:{
            type: "int"
        },
        NumAtCard:{
            type: "varchar"
        },
        DocDate:{
            type: "date"
        },
        DocDueDate:{
            type: "date"
        },
        TaxDate:{
            type: "date"
        },
        Comments:{
            type: "varchar"
        },
        JournalMemo:{
            type: "varchar"
        },
        CardCode:{
            type: "varchar"
        },
        CardName:{
            type: "varchar"
        },
        json:{
            type: "text"
        },
        numero_pedidos:{
            type: "text"
        },
        estado:{
            type: "int"
        },
        createdAt:{
            type: "date"
        },
        deletedAt:{
            type: "date"
        },
        deletedBy:{
            type: "varchar"
        },
        createdBy:{
            type: "varchar"
        },
        MsjRespuesta:{
            type: "text"
        },
        Area:{
            type: "varchar"
        },
        IdUsuarioAsignado:{
            type: "int"
        },
        NombreUsuarioAsignado:{
            type: "varchar"
        },
        JsonBodega:{
            type: "text"
        },
        DiscountPercent:{
            type: "double"
        }
    }
})