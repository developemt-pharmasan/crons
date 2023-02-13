const {connect,hanaConfig, execute} = require('../../../../database/hanaClient')
const generarWS = require('../../../../libs/generarWS')
const axiosWebService = require('../../../../libs/axiosWebService')
const dayjs = require("dayjs");
module.exports = async () => {
    return new Promise(async (resolve, reject) => {
        const conn = await connect()
        conn.connect(hanaConfig, async function (err) {
            const dataWS = await generarWS('SISPRO FACTURACION')
            if (err) throw err;
                const { nit, tokken_secundario } = dataWS
                let baseUrl = `https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/Facturacion`
                let baseUrlDire = `https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/DireccionamientoXPrescripcion`
                const date = dayjs('2022-08-17').format('YYYY-MM-DD');

                const sql_1 = `SELECT * FROM MP_UPD_STA where TO_NVARCHAR("FecDireccionamiento", 'YYYY-MM-DD') = '${date}' `
                const respuesta = await execute({conn,query:sql_1,params:[]})
                // console.log('MP_UPD_STA', respuesta)

                if (respuesta) {
                    for (const dire of respuesta) {
                        // console.log('direccionamiento---', dire)
                        axiosWebService(`${baseUrlDire}/${nit}/${tokken_secundario}`, 'GET', dire.NoPrescripcion).then((data) => {
                            console.log('NoPrescripcion---------', data)
                            var filtered = []
                            for (const val of data) {
                                console.log('val of dire', val)
                                var allowed = [ 'ID', 'IDDireccionamiento', 'EstDireccionamiento' ]
                                filtered = val.filter(a => {
                                    console.log('filtrando--', a);
                                    return a.include(allowed)
                                })
                            }
                            // console.log('filtered---', filtered)
                        })


                        // const sql_3 = `UPDATE MP_FAC SET "updated_by" = '${updated_by}', 
                        // "updated_at" = '${updated_at}', "sent" = '${sent}' where "id" = '${id}' `
                        // execute({conn,query:sql_3,params:[]}).catch(err => reject(err))
                        
                        // var data_facturacion = []


                        // axiosWebService(`${baseUrl}/${nit}/${tokken_secundario}`, 'PUT', data_facturacion).then((data) => {

                        //     const sql_3 = `UPDATE MP_FAC SET "sent" = '${sent}', "error" = '${error}', "IdResponse" = '${IdResponse}', 
                        //     "IdFacturacion" = '${IdFacturacion}', "fecha_registro" = '${fecha_registro}' where "id" = '${id}' `
                        //     execute({conn,query:sql_3,params:[]}).catch(err => reject(err))

                        // })
                    }
                }
                // console.log('sql------', sql_1)
            conn.disconnect()
            resolve(respuesta)

        });
    });
}