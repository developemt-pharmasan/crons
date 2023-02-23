const {connect,hanaConfig, execute} = require('../../../../database/hanaClient')
module.exports = async (body) => {
    let columns = '("ID","IDDireccionamiento","NoPrescripcion","TipoTec","ConTec","TipoIDPaciente","NoIDPaciente","NoEntrega","NoSubEntrega","TipoIDProv","NoIDProv","CodMunEnt","FecMaxEnt","CantTotAEntregar","DirPaciente","CodSerTecAEntregar","NoIDEPS","CodEPS","FecDireccionamiento","EstDireccionamiento","FecAnulacion")'
    return new Promise(async (resolve, reject) => {
        const conn = await connect()
        conn.connect(hanaConfig, async function (err) {
            if (err) throw err;
            var rest = []
            for (const items of Object.values(body)) {
                // console.log('ítem----', items)
                let texto = ''
                for (const value of Object.values(items)) {
                    texto += typeof value === 'string' ? `,'${value}'` : `,${value}`;
                }
               
                const sql_1 = `INSERT INTO MP_DIR ${columns} VALUES (${texto.slice(1)})`
                await execute({conn,query:sql_1,params:[]})
                
            }
            conn.disconnect()
            resolve(body)

        });
    });
}