class RECEPCION_PEDIDOS_CABECERA {
    constructor(
        DocEntry,
        DocNum,
        NumAtCard,
        DocDate,
        DocDueDate,
        TaxDate,
        Comments,
        JournalMemo,
        CardCode,
        CardName,
        json,
        numero_pedidos,
        estado,
        createdAt,
        deletedAt,
        deletedBy,
        createdBy,
        MsjRespuesta,
        Area,
        IdUsuarioAsignado,
        NombreUsuarioAsignado,
        JsonBodega,
        DiscountPercent
    ) {
        this.DocEntry = DocEntry
        this.DocNum = DocNum
        this.NumAtCard = NumAtCard
        this.DocDate = DocDate
        this.DocDueDate = DocDueDate
        this.TaxDate = TaxDate
        this.Comments = Comments
        this.JournalMemo = JournalMemo
        this.CardCode = CardCode
        this.CardName = CardName
        this.json = json
        this.numero_pedidos = numero_pedidos
        this.estado = estado
        this.createdAt = createdAt
        this.deletedAt = deletedAt
        this.deletedBy = deletedBy
        this.createdBy = createdBy
        this.MsjRespuesta = MsjRespuesta
        this.Area = Area
        this.IdUsuarioAsignado = IdUsuarioAsignado
        this.NombreUsuarioAsignado = NombreUsuarioAsignado
        this.JsonBodega = JsonBodega
        this.DiscountPercent = DiscountPercent
    }
}

module.exports = {
    RECEPCION_PEDIDOS_CABECERA
};


