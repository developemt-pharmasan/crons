const listReporteFacturacion = require('../infrastructure/repository/listReporteFacturacion.repository')

module.exports = async ({ user}) => {
    try {
        return listReporteFacturacion()
    } catch (error) {
        console.log('error reporte entrega: ', error);
        return null
    }
    
}
