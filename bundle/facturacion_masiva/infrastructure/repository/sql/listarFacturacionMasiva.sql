select 
*
from "FacturacionMasivaDetalles" 
where (estado = 0 or estado is null)
and (
	select count(id) from "FacturacionMasivaDetalles" s1 where "serviceLayer" = true  and (estado = 0 or estado is null)
) = 0
order by id
limit 1