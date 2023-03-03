const compararDireccionamiento = require('../infrastructure/repository/compararDireccionamiento.repository')

module.exports = async ({ user}) => {
    try {
        return compararDireccionamiento()
    } catch (error) {
        console.log('error reporte entrega: ', error);
        return null
    }
    
}
