const generarWS = require('../../../libs/generarWS')
const axiosWebService = require('../../../libs/axiosWebService')
const dayjs = require('dayjs')
// const { MipresDireccionamiento } = require('../../../database/models')
const repoSaveMipres = require('../infrastructure/repository/saveMipres.repository')
const repoProgMipres = require('../infrastructure/repository/programar_mipres.repository')
const listDireccionamientos = require('../infrastructure/repository/listDireccionamientos.repository')

module.exports = async ({ user}) => {
    try {
        const dataWS = await generarWS('SISPRO FACTURACION')
        if (dataWS) {
            const { nit, tokken_secundario } = dataWS
            let baseUrl = `https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/DireccionamientoXFecha`
            // reporte entrega direccionamiento en el webservice
            const fecha = dayjs().format('YYYY-MM-DD')
            axiosWebService(`${baseUrl}/${nit}/${tokken_secundario}/${fecha}`).then((data) => {
                // console.log('listDireccionamientos-----', fecha)
                const Direccionamientos = listDireccionamientos(fecha)
                var data_fill = []
                Direccionamientos.then((ids) => {
                    // console.log('ids--------------------------', ids)
                    var rest = ''
                    for (const i of data) {
                        rest = ids.find(el => el.ID == i.ID)
                        if (!rest) {
                            // console.log('push---')
                            data_fill.push(i)
                        }
                    }
                    // console.log('data-id- save------', data_fill);
                    return repoSaveMipres(data_fill).then((data) => {
                            // console.log('enviando data a prog.--------', data)
                        return repoProgMipres(data)
                    }).catch(e => console.log('Error en la Entrega----------', e))
                    // console.log('fin--------------------------------')
                })
            })
        }

        return null

    } catch (error) {
        console.log('error reporte entrega: ', error);
        return null
    }
    
}
