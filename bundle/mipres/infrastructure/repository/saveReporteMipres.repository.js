const {connect,hanaConfig, execute} = require('../../../../database/hanaClient')
module.exports = async (body) => {
    let columns = `("ID","IDReporteEntrega","NoPrescripcion","TipoTec","ConTec","TipoIDPaciente","NoIDPaciente","NoEntrega","EstadoEntrega","CausaNoEntrega", 
    "ValorEntregado","CodTecEntregado","CantTotEntregada","NoLote","FecEntrega","FecRepEntrega","EstRepEntrega","FecAnulacion")`
    return new Promise(async (resolve, reject) => {
        const conn = await connect()
        conn.connect(hanaConfig, async function (err) {
            if (err) throw err;
            for (const item of Object.values(body)) {
                // console.log('item--------------------', item)
                let texto = ''
                let respuesta = []
                const sql_id = `SELECT "ID" FROM MP_ENT_MAS WHERE "ID" = '${item.ID}'`
                const id_mipres = await execute({conn,query:sql_id,params:[]})
                // console.log('id_mipres--', id_mipres)
                if (id_mipres[0]) {
                    let sql_1 = ` UPDATE MP_ENT_MAS SET "IDReporteEntrega" = ${item.IDReporteEntrega}, 
                    "NoPrescripcion" = '${item.NoPrescripcion}', "TipoTec" = '${item.TipoTec}',  "ConTec" = ${item.ConTec}, 
                    "TipoIDPaciente" = '${item.TipoIDPaciente}', "NoIDPaciente" = '${item.NoIDPaciente}', "NoEntrega" = ${item.NoEntrega}, 
                    "EstadoEntrega" = ${item.EstadoEntrega}, "CausaNoEntrega" = ${item.CausaNoEntrega}, "ValorEntregado" = ${item.ValorEntregado}, 
                    "CodTecEntregado" = '${item.CodTecEntregado}', "CantTotEntregada" = ${item.CantTotEntregada}, 
                    "NoLote" = ${item.NoLote}, "EstRepEntrega" = ${item.EstRepEntrega} `
                    if (item.FecRepEntrega) {sql_1 += `, "FecRepEntrega" = '${item.FecRepEntrega}' `}
                    if (item.FecEntrega) {sql_1 += `, "FecEntrega" = '${item.FecEntrega}' `}
                    if (item.FecAnulacion) {sql_1 += `, "FecAnulacion" = '${item.FecAnulacion}' `}
                    sql_1 += ` where "ID" = '${item.ID}'  ` 
                    respuesta.push('se actusaliza - '+ item.ID)  
                    // console.log('se actusaliza---', item.ID)
                    await execute({conn,query:sql_1,params:[]}).catch(err => reject(err)) 
                    
                } else {
                    for (const value of Object.values(item)) {
                        texto += typeof value === 'string' ? `,'${value}'` : `,${value}`;
                    }
                    const sql_1 = `INSERT INTO MP_ENT_MAS ${columns} VALUES (${texto.slice(1)})`
                    respuesta.push('se crea - '+ item.ID)
                    // console.log('se guarda nuevo---')
                    await execute({conn,query:sql_1,params:[]})
                }
                // console.log('sql------', sql_1)
            }
            conn.disconnect()
            resolve(body)

        });
    });
}