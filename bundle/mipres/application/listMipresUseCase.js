const generarWS = require('../../../libs/generarWS')
const axiosWebService = require('../../../libs/axiosWebService')
const dayjs = require('dayjs')
// const { MipresDireccionamiento } = require('../../../database/models')
const repoSaveMipres = require('../infrastructure/repository/saveMipres.repository')
const repoProgMipres = require('../infrastructure/repository/programar_mipres.repository')
const listDireccionamientos = require('../infrastructure/repository/listaDireccionamientos.repository')
const updateState = require('../infrastructure/repository/actualizar_estado.repository')

module.exports = async () => {
    try {
        const dataWS = await generarWS('SISPRO FACTURACION')
        if (dataWS) {
            const { nit, tokken_secundario } = dataWS
            let baseUrl = `https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/DireccionamientoXFecha`
            let baseUrlEntrega = `https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/EntregaXPrescripcion`
            // reporte entrega direccionamiento en el webservice
            const fecha = dayjs().format('YYYY-MM-DD')
            axiosWebService(`${baseUrl}/${nit}/${tokken_secundario}/${fecha}`).then((data) => {
                const Direccionamientos = listDireccionamientos(fecha)
                var data_fill = []
                var data_upd = []
                Direccionamientos.then( async(ids) => {
                    var rest = ''
                    for (const i of data) {
                        rest = ids.find(el => el.ID == i.ID)
                        if (!rest) {
                            data_fill.push(i)
                        } else {
                            if (i.EstDireccionamiento == 0) {
                                i.estado = 'ANULADO'
                            } else if (i.EstDireccionamiento == 1) {
                                i.estado = 'SIN PROGRAMAR'
                            } else if (i.EstDireccionamiento == 2) {
                                await axiosWebService(`${baseUrlEntrega}/${nit}/${tokken_secundario}/${i.NoPrescripcion}`).then((data2) => {
                                    var entrega = data2.find(el => el.NoEntrega == i.NoEntrega)
                                    if (entrega) {
                                        if (entrega.EstEntrega == 1) {
                                            i.estado = 'ENTREGADO'
                                        }
                                        if (entrega.EstEntrega == 2) {
                                            i.estado = 'REPORTADO'
                                        }
                                    } else {
                                        i.estado = 'PROGRAMADO'
                                    }
                                    data_upd.push(i)
                                })
                            }
                        }
                    }
                    if (data_upd.length) {
                        updateState(data_upd, 2, request.user)
                    }
                    if (data_fill.length) {
                        return repoSaveMipres(data_fill).then((data) => {
                            return repoProgMipres(data)
                        }).catch(e => console.log('Error al actualizar los direccionamientos----------', e))
                        // console.log('fin--------------------------------')
                    }
                })
            })
        }

        return null

    } catch (error) {
        console.log('error reporte entrega: ', error);
        return null
    }
    
}
