const {connect,hanaConfig, execute} = require('../../../../database/hanaClient')
const dayjs = require("dayjs");
const generarWS = require('../../../../libs/generarWS')
const axiosWebService = require('../../../../libs/axiosWebService')
// const list_mipres = require('./list_mipres.repositories')

module.exports = async (body, user) => {

    return new Promise(async (resolve, reject) => {
        const conn = await connect()
        const dataWS = await generarWS('SISPRO FACTURACION')
        conn.connect(hanaConfig, async function (err) {
            if (err) throw err;
            if (dataWS) {
                const { nit, tokken_secundario } = dataWS
                let baseUrl = `https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/Programacion`

                for (const item of body) {
                    // var item = data
                        // var IdProgramacion = 0    //id que retorna el update

                        // FecMaxEnt: '2023-02-08',
                        // CodSerTecAEntregar: '139',
                        // CantTotAEntregar: '120',

                        let data_array = {}
                        // const data_array = []
                        data_array['ID'] = item.ID
                        data_array['FecMaxEnt'] = item.FecMaxEnt
                        data_array['TipoIDSedeProv'] = item.TipoIDProv
                        data_array['NoIDSedeProv'] = item.NoIDProv
                        data_array['CodSedeProv'] = '680010437501'
                        data_array['CodSerTecAEntregar'] = item.CodSerTecAEntregar
                        data_array['CantTotAEntregar'] = item.CantTotAEntregar

                        // const IdProceso = 0
                        // const FecProceso = dayjs().format('YYYY-MM-DD HH:mm:ss')
                        // console.log('axios service', data_array)
                        const EstDireccionamiento = 2
                        const tipo = 'PROGRAMADO'
                        const IdProgramacion = 0
                        const EstProgramacion = 1
                        const fecha = dayjs().format('YYYY-MM-DD HH:mm:ss')

                        // console.log('antes de api--------', data_array)
                        await axiosWebService(`${baseUrl}/${nit}/${tokken_secundario}`, 'PUT', data_array).then(async(data) => {
                            console.log('luego de api------------------', data)
                            IdProgramacion = data[0].IdProgramacion

                            // console.log('data token', data)
                            
                            const sql_1 = `UPDATE MP_DIR SET "EstDireccionamiento" = '${EstDireccionamiento}', 
                            "InfoEstDireccionamiento" = '${tipo}', "EstProgramacion" = '${EstProgramacion}', 
                            "FecProgramacion" = '${fecha}' where "ID" = '${item.id_mipres}' `
                            await execute({conn,query:sql_1,params:[]}).catch(err => reject(err))

                            var sql_2 = ` INSERT INTO MP_HIST ("ID", "IdProceso", "FecProceso", "Observacion", "CreatedAt", 
                            "UserIdEmployee", "Estado", "TipoProceso", "employee") 
                            values (${item.id_mipres}, '${IdProceso}', '${fecha}', '${item.Comentario}', 
                            '${fecha}', ${user.id}, 1, 2, '${user.people.full_name}') `
                            await execute({conn,query:sql_2,params:[]}).catch(err => reject(err))

                            // console.log('fin--------', sql_1)
                        }).catch(e => console.log('Error en la programacion----------', e))
                        
                        // console.log('data_array', data_array)
                }   
            }
            conn.disconnect()
            resolve(body)
        });
    });
}
