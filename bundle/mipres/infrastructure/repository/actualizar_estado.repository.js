const {connect,hanaConfig, execute} = require('../../../../database/hanaClient')
const dayjs = require("dayjs");
const generarWS = require('../../../../libs/generarWS')
const axiosWebService = require('../../../../libs/axiosWebService')
// const list_mipres = require('./list_mipres.repositories')

module.exports = async (mipres, state, user) => {

    return new Promise(async (resolve, reject) => {
        const conn = await connect()
        const dataWS = await generarWS('SISPRO FACTURACION')
        conn.connect(hanaConfig, async function (err) {
            if (err) throw err;
            if (dataWS) {
                const { nit, tokken_secundario } = dataWS
                let baseUrl = `https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/ProgramacionXPrescripcion`

                // const EstDireccionamiento = state
                // const tipo = 'PROGRAMADO'
                const IdProceso = 0
                var EstProgramacion = 1
                const fecha = dayjs().format('YYYY-MM-DD HH:mm:ss')

                // console.log('antes de api--------', data_array)
                // IdProgramacion = data[0].IdProgramacion
                for (const mp of mipres) {
                    if (mp.EstDireccionamiento != 2) {
                        EstProgramacion = 0
                    }
                    await axiosWebService(`${baseUrl}/${nit}/${tokken_secundario}/${mp.NoPrescripcion}`, 'GET', []).then(async (data) => {
                        const prog = data.filter(m => m.ID == mp.ID)[0]
                        // console.log('respuesta de buscar programaicon----', prog)
                        const sql_1 = `UPDATE MP_DIR SET "EstDireccionamiento" = '${mp.EstDireccionamiento}', 
                        "InfoEstDireccionamiento" = '${mp.estado}', "EstProgramacion" = '${EstProgramacion}', 
                        "IdProgramacion" = ${prog.IDProgramacion},
                        "FecProgramacion" = '${fecha}' where "ID" = '${mp.ID}' `
                        await execute({conn,query:sql_1,params:[]}).catch(err => reject(err))
                        
                        var sql_2 = ` INSERT INTO MP_HIST ("ID", "IdProceso", "FecProceso", "Observacion", "CreatedAt", 
                        "UserIdEmployee", "Estado", "TipoProceso", "employee") 
                        values (${mp.ID}, '${mp.IDDireccionamiento}', '${mp.FecDireccionamiento}', 'Direccionamiento agregado automaticamente', 
                        '${fecha}', ${user.id}, '${mp.EstDireccionamiento}', 2, '${user != '' ? user.people.full_name: user}') `
                        await execute({conn,query:sql_2,params:[]}).catch(err => reject(err))
                    }).catch(e => console.log('Error en la programacion----------', e))
                }

                
                // console.log('data_array', data_array)
            }   
            conn.disconnect()
            resolve(mipres)
        });
    });
}
