const {connect,hanaConfig, execute} = require('../../../../database/hanaClient')
const generarWS = require('../../../../libs/generarWS')
const axiosWebService = require('../../../../libs/axiosWebService')
module.exports = async () => {
    return new Promise(async (resolve, reject) => {
        const conn = await connect()
        conn.connect(hanaConfig, async function (err) {
            const dataWS = await generarWS('SISPRO FACTURACION')
            if (err) throw err;
                const { nit, tokken_secundario } = dataWS
                let baseUrl = `https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/Facturacion`
                const sql_1 = `SELECT * FROM MP_FAC where deleted is null and send = 0`
                const respuesta = await execute({conn,query:sql_1,params:[]})

                var error = ''
                var IdResponse = ''
                var IdFacturacion = ''
                var fecha_registro = ''

                if (respuesta) {
                    for (const value of respuesta) {
                        const id         = value.id;
                        const updated_by = value.created_by;
                        const updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
                        var sent       = 1;
                        
                        const sql_2 = `UPDATE MP_FAC SET "updated_by" = '${updated_by}', 
                        "updated_at" = '${updated_at}', "sent" = '${sent}' where "id" = '${id}' `
                        execute({conn,query:sql_2,params:[]}).catch(err => reject(err))
                        
                        var data_facturacion = {}
                        data_facturacion['NoPrescripcion'] = value.NoPrescripcion
                        data_facturacion['TipoTec']            = value.TipoTec
                        data_facturacion['ConTec']              = value.ConTec
                        data_facturacion['TipoIDPaciente']      = value.TipoIDPaciente
                        data_facturacion['NoIDPaciente']        = value.NoIDPaciente
                        data_facturacion['NoEntrega']           = value.NoEntrega
                        data_facturacion['NoFactura']           = value.NoFactura
                        data_facturacion['NoIDEPS']             = value.NoIDEPS
                        data_facturacion['CodEPS']              = value.CodEPS
                        data_facturacion['CantUnMinDis']        = value.CantUnMinDis
                        data_facturacion['CodSerTecAEntregado'] = value.CodSerTecAEntregado
                        data_facturacion['ValorUnitFacturado']  = value.ValorUnitFacturado
                        data_facturacion['ValorTotFacturado']   = value.ValorTotFacturado
                        data_facturacion['CuotaModer']          = value.CuotaModer
                        data_facturacion['Copago']              = value.Copago
                        data_facturacion['NoSubEntrega']        = value.NoSubEntrega

                        await axiosWebService(`${baseUrl}/${nit}/${tokken_secundario}`, 'PUT', data_facturacion).then(async(data) => {
                            if (isset(data.error) && data.error == 1) {
                                var data_update = []
                                sent           = 3;
                                error          = $message;
                                IdResponse     = null;
                                IdFacturacion  = null;
                                fecha_registro = null;
                            } else {
                                sent           = 2;
                                var resp                          = data[0];
                                error          = '';
                                IdResponse     = resp.Id;
                                IdFacturacion  = resp.IdFacturacion;
                                fecha_registro = dayjs().format('YYYY-MM-DD');
                            }

                            const sql_3 = `UPDATE MP_FAC SET "sent" = '${sent}', "error" = '${error}', "IdResponse" = '${IdResponse}', 
                            "IdFacturacion" = '${IdFacturacion}', "fecha_registro" = '${fecha_registro}' where "id" = '${id}' `
                            await execute({conn,query:sql_3,params:[]}).catch(err => reject(err))

                        })
                    }
                }
                // console.log('sql------', sql_1)
            conn.disconnect()
            resolve(respuesta)

        });
    });
}