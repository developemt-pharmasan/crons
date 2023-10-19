select
    distinct
    cp.full_name
from
    public."SecurityUsers" su
        inner join public."CommonPeoples" cp on cp.id = su.base
where su.id = :userId