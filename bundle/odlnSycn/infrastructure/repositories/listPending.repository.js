const { Ov, sequelize } = require('../../../../database/models');
module.exports = async () => {
  return sequelize.query(`
   select 
    	distinct 
    	o."CardCode",
    	vn."DocEntry" as "BaseEntry",
    	vn."DocNum" as "BaseRef", 
    	o."Id" as "NumOv",
    	o."FechaContabilizacion" as "DocDate",
    	od."Id" as "U_PG_IdOvDt",
    	od."ItemCode",
    	od."WarehouseCode", 
    	abs(od."Quantity") as "Quantity",
    	o."DocStatus",
    	ms."BatchNumber",
    	abs(ms."Quantity") as "BatchQuantity",
    	b."AbsEntry" 
    from 
    sap_business."OV" o
    inner join sap_sync."OV_NO_ENTREGADA" vn on vn."NumOv" = o."Id"
    inner join sap_business."OV_DT" od on o."Id" = od."DocId"
    left  join sap_business."MOV_STOCK" ms on ms."BaseId" = od."Id" and ms."ObjectType" = 15
    left join  sap_business."BODEGAS" b on b."WhsCode" = ms."WhsCode" 
    where  od."DeletedAt" is null 
    -- and o."Id" = 10007544
    and O."FechaContabilizacion" >= '2024-01-16'
    and o."deletedAt" is null 
    and o."DocStatus" = 1;
  `, {
      type: sequelize.QueryTypes.SELECT,
    }) 
}