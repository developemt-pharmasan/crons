require('dotenv').config()
const cron = require('node-cron')
// const nextScheduledPaymentsUseCase = require('./bundle/amortizaciones/application/nextScheduledPaymentsUseCase')
// const requestsCreateRankDaysAlertUseCase = require('./bundle/compras/application/requestsCreateRankDaysAlertUseCase')
// const { correosInformativosUseCase } = require('./bundle/sensores/application/correos.informativos.useCase')
const savefacturacionMasivaCapita = require('./bundle/facturacion_masiva/application/savefacturacionMasivaSapUseCase') // CAPITA
const saveSapEvento = require('./bundle/facturacion_masiva/application/saveSapEventoUseCase')
const saveFacturacionMasivaEventoCapita = require('./bundle/facturacion_masiva/application/saveSapEventoCapita.useCase')
// const saveFacturacionPagoProspectivoNoPbs = require('./bundle/facturacion_masiva/application/savePpNOPPS.useCase')
// const saveFacturacionPagoProspectivoPbs = require('./bundle/facturacion_masiva/application/savePpPPS.useCase')
// const saveSegfacturacionSapUseCase = require('./bundle/segupharma_facturacion/application/savefacturacionMasivaSapUseCase')
// const saveMipres = require('./bundle/mipres/application/listMipresUseCase')
// const reporteEntregaFecha = require('./bundle/mipres/application/reporteEntregaMipresUseCase')
// const updateTmpMipres = require('./bundle/mipres/application/updateTempMipresUseCase')
// const compararDireccionamientoEstado = require('./bundle/mipres/application/compararDireccionamientoMipresUseCase')


console.log('start...')
cron.schedule('*/1 * * * 1-5', savefacturacionMasivaCapita) // cada 1 minuto
cron.schedule('*/50 * * * * 6,0', savefacturacionMasivaCapita) // cada 50 segundos sabado y domingo
cron.schedule('* * * * * *', saveSapEvento) // cada segundo
cron.schedule('* * * * * *', saveFacturacionMasivaEventoCapita) // cada segundo

