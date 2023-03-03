const generarWS = require('../../../libs/generarWS')
const axiosWebService = require('../../../libs/axiosWebService')
const dayjs = require('dayjs')
// const { MipresDireccionamiento } = require('../../../database/models')
const saveReporteMipres = require('../infrastructure/repository/saveReporteMipres.repository')

module.exports = async () => {
    try {
        const dataWS = await generarWS('SISPRO FACTURACION')
        if (dataWS) {
            // { fechaInicio: '2023-01-10', fechaFin: '2023-01-10' }}
            var fecha = dayjs().format('YYYY-MM-DD')
            const { nit, tokken_secundario } = dataWS
            let baseUrl = `https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/ReporteEntregaXFecha`
            // reporte entrega direccionamiento en el webservice
            await axiosWebService(`${baseUrl}/${nit}/${tokken_secundario}/${fecha}`).then(async (data) => {
                await saveReporteMipres(data)
            })
        }

        return null

    } catch (error) {
        console.log('error reporte entrega: ', error);
        return null
    }
    
}
