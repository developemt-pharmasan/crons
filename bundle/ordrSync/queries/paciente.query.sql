select
    "U_ACS_CdgPct",
    (
        case
            when :Rango = 'R1' then 'Contributivo Rango 1'
            when :Rango = 'R2' then 'Contributivo Rango 2'
            when :Rango = 'R3' then 'Contributivo Rango 3'
        end
    ) as "U_PHR_Rango",
    ap."U_ACS_NmbPct",
    ap."U_ACS_NmbEntidad"
from
    sap_business."ACS_PACIENTES" ap
where ap."U_ACS_TpoIdentf" = :TpoIdentf and ap."U_ACS_NmrIdentf" = :NmrIdentf