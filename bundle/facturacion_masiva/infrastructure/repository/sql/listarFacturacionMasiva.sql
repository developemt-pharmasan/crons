select * 
from "FacturacionMasivaDetalles" 
where (estado = 0 or estado is null) 
and "serviceLayer" = false
order by id
limit 1