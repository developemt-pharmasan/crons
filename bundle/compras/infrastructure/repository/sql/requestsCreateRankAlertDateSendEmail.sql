select p."full_name", p."email" from "SecurityUsers" u
inner join "CommonPeoples" p on p."id" = u."base" 
where u."group_id" = 5
and (
	select count(*) from "AdministrativePurchasingConfigs" conf 
	where conf."diaCierre" = :dayActually
	-- where conf."diaCierre" = EXTRACT(DAY FROM CURRENT_DATE)
) > 0
and (
	select count(*) from "AdministrativePurchasingRequests" r 
	where :dateActually = to_char(r."createdAt", 'YYYY-MM-DD')
	-- where to_char(CURRENT_DATE, 'YYYY-MM-DD') = to_char(r."createdAt", 'YYYY-MM-DD')
) = 0