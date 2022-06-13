select * 
from "FacturacionMasivaDetalles" 
where estado = 0 or estado is null
order by id
limit 1