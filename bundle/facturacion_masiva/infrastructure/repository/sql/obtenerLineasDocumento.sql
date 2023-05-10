SELECT
	TOR."DocNum" AS "OV",
	T0."DocEntry" AS "BaseEntry",
	T0."LineNum" AS "BaseLine",
	T0."ItemCode",
	T0."WhsCode" AS "WarehouseCode",
	T1."U_PHR_CentroCosto" AS "CostingCode",
	15 AS "BaseType", 
	CAST(T0."LineTotal" AS FLOAT) AS "LineTotal" 
FROM
	DLN1 T0
	INNER JOIN ORDR TOR ON TOR."DocEntry" = T0."BaseEntry" 
	INNER JOIN OWHS T1 ON T0."WhsCode" = T1."WhsCode" 
WHERE TOR."DocNum" IN (:ordenes)
    AND 
       LEFT(T0."ItemCode", 2) = 'MD'
	AND T0."LineStatus" = 'O'
	AND T0."TargetType" != 16
ORDER BY 
	T0."DocEntry" ASC,
	T0."LineNum" ASC