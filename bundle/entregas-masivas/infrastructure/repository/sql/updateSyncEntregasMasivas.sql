update sap_business."OV_SYNC" 
set "ServicelayerResponse" = :ServicelayerResponse, 
"Status" = :estado,
"DocEntry" = :DocEntry,
"DocNum" = :DocNum
where "Id" = :Id