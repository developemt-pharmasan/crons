const {connect,hanaConfig, execute} = require('../../../../database/hanaClient')
module.exports = async (body) => {
    let columns = '("ID","IDReporteEntrega","NoPrescripcion","TipoTec","ConTec","TipoIDPaciente","NoIDPaciente","NoEntrega","CausaNoEntrega","EstadoEntrega","CodTecEntregado","CantTotEntregada","NoLote","FecEntrega","FecRepEntrega","EstRepEntrega","FecAnulacion")'
    return new Promise(async (resolve, reject) => {
        const conn = await connect()
        conn.connect(hanaConfig, async function (err) {
            if (err) throw err;
            for (const items of Object.values(body)) {
                let texto = ''
                for (const value of Object.values(items)) {
                    texto += typeof value === 'string' ? `,'${value}'` : `,${value}`;
                }
                const sql_1 = `INSERT INTO MP_DIR ${columns} VALUES (${texto.slice(1)})`
                await execute({conn,query:sql_1,params:[]})
                // console.log('sql------', sql_1)
            }
            conn.disconnect()
            resolve(body)

        });
    });
}