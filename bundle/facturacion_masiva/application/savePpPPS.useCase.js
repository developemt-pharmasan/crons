const repository = require('../infrastructure/repository/listarFacturacionMasivaRepositoryPpPBS')
const obtenerOrdenesRepositorio = require('../infrastructure/repository/obtenerOrdenesRepository')
const updateRepository = require('../infrastructure/repository/updateFacturacionMasivaResponseSapRepository')
const updateJson = require('../infrastructure/repository/updateJsonCapita.repository')
const dayjs = require('dayjs')
const {Sequelize, sequelize} = require('../../../database/models')
const updateFacturacionMasivaResponseDetalleOvSapRepository = require('../infrastructure/repository/updateFacturacionMasivaResponseDetalleOvSapRepository')
const axios = require("axios");
const obtenerLineasDocumento = async(ordenes) => {
  const repositorio = require('../infrastructure/repository/obtenerLineasDocumento.repository')
  const arregloOrdenes = ordenes.map(a => a.NumOrden).join()
  return await repositorio(arregloOrdenes)
}
const crearJson = async (grupo) => {
  const ordenes = await obtenerOrdenesRepositorio(grupo.id)
  if (!ordenes.length) return 'No se encontraron ordenes al crear el json'
  let DocumentLines = await obtenerLineasDocumento(ordenes)
  if (!DocumentLines.length) return 'Error al facturar, revisa si estas ordenes ya cuenta con una factura'
  const monto_linea_capita = (lineas) => {
    let res = 0
    lineas.forEach(element => {
      res += element.LineTotal
    })
    return res
  }
  const totalLine = monto_linea_capita(DocumentLines)
  DocumentLines.push(
    {
        ItemCode: "CAPITA001",
        Price: totalLine,
        Quantity: -1,
        CostingCode: DocumentLines[0].CostingCode,
        WarehouseCode: DocumentLines[0].WarehouseCode
    }
  )
  grupo.json.DocumentLines = DocumentLines
  await updateJson(grupo.id, JSON.stringify(grupo.json))
  return grupo.json
}
module.exports = () => {
  const inicio = dayjs()
  return repository().then(async facturacioMasivasDetalle => {
    if(!facturacioMasivasDetalle.length)  return console.log('NO HAY FACTURAS PAGO PROSPECTIVO PBS POR ENVIAR A SAP')
    console.log('VA A FACTURAR EN PAGO PROSPECTIVO PBS--->', facturacioMasivasDetalle);
    let promises = []
    for (const item of facturacioMasivasDetalle) {
      const json = await crearJson(item)
      if (json === 'Error al facturar, revisa si estas ordenes ya cuenta con una factura' || json === 'No se encontraron ordenes al crear el json') {
        console.log('ERROR AL CREAR EL JSON-->', item)
        if (item.NumFacturaResponse) {
          console.log('YA CONTIENE FACTURA EJ-->', item.NumFacturaResponse)
          const responseDetalle = updateRepository({
            id: item.id,
            NumFacturaResponse: item.NumFacturaResponse,
            response: 'OK',
            estado: 1,
            serviceLayer: false
          })
          promises.push(responseDetalle)
          const responseDetalleOv = updateFacturacionMasivaResponseDetalleOvSapRepository({
            facturacionMasivaDetalleId: item.id,
            NumFactura: item.NumFacturaResponse,
            Comentarios: 'OK',
            Estado: 1
          })
          promises.push(responseDetalleOv)
        } else {
          console.log('NO CONTIENE FACTURA EJ-->', item.NumFacturaResponse)
          const responseDetalle = updateRepository({
            id: item.id,
            NumFacturaResponse: null,
            response: json,
            estado: 2,
            serviceLayer: false
          })
          promises.push(responseDetalle)
          const responseDetalleOv = updateFacturacionMasivaResponseDetalleOvSapRepository({
            facturacionMasivaDetalleId: item.id,
            NumFactura: null,
            Comentarios: json,
            Estado: 2
          })
  
          // console.log("FACTURA DE CAPITA GENERADA...",responseSap.data ? responseSap.data : " FALLO ");
          promises.push(responseDetalleOv)
        }
      } else {
        console.log('JSON CREADO CORRECTAMENTE-->', item)
        const options = {
          method: 'POST',
          url: `${process.env.SERVICE_LAYER_HOST}/invoices`,
          headers: { 'Content-Type': 'application/json', 'company': 'PRUEBAS_PHARMA', 'module': 'Facturacion masiva', 'type': 'Invoices' },
          data: json
        };
        const sql = `update "FacturacionMasivaDetalles" set "serviceLayer" = true where id = ${item.id}`
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT
        })
        
        await axios.request(options).then(resp => {
          console.log('la respuesta de la facturacion---then------------', resp.data)
          if (resp.data.DocNum) {
            const responseDetalle = updateRepository({
              id: item.id,
              NumFacturaResponse: resp.data.DocNum,
              response: 'OK',
              estado: 1,
              serviceLayer: false
            })
            promises.push(responseDetalle)
            const responseDetalleOv = updateFacturacionMasivaResponseDetalleOvSapRepository({
              facturacionMasivaDetalleId: item.id,
              NumFactura: resp.data.DocNum,
              Comentarios: 'OK',
              Estado: 1
            })
            promises.push(responseDetalleOv)
            console.log('FACTURA CREADA CORRECTAMENTE-->', resp.data)
            // console.log("FACTURA DE CAPITA GENERADA...",resp.data ? resp.data : " FALLO ");
          } else {
            if (item.NumFacturaResponse) {
              console.log('YA CONTIENE FACTURA JC-->', item.NumFacturaResponse)
              const responseDetalle = updateRepository({
                id: item.id,
                NumFacturaResponse: item.NumFacturaResponse,
                response: 'OK',
                estado: 1,
                serviceLayer: false
              })
              promises.push(responseDetalle)
              const responseDetalleOv = updateFacturacionMasivaResponseDetalleOvSapRepository({
                facturacionMasivaDetalleId: item.id,
                NumFactura: item.NumFacturaResponse,
                Comentarios: 'OK',
                Estado: 1
              })
              promises.push(responseDetalleOv)
            } else {
              console.log('NO CONTIENE FACTURA JC-->', item.NumFacturaResponse)
              const responseDetalle = updateRepository({
                id: item.id,
                NumFacturaResponse: null,
                response: resp.data.Descripcion,
                estado: 2,
                serviceLayer: false
              })
              promises.push(responseDetalle)
              const responseDetalleOv = updateFacturacionMasivaResponseDetalleOvSapRepository({
                facturacionMasivaDetalleId: item.id,
                NumFactura: null,
                Comentarios: resp.data.Descripcion,
                Estado: 2
              })
              promises.push(responseDetalleOv)
            }
            console.log('ERROR AL CREAR LA FACTURA JC-->', resp.data)
          }
        })
        .catch((error) => {
          console.log('ERROR DE CATCH --->', error)
          if (item.NumFacturaResponse) {
            console.log('YA TIENE FACTURA CTCH-->', resp.data)
            const responseDetalle = updateRepository({
              id: item.id,
              NumFacturaResponse: item.NumFacturaResponse,
              response: 'OK',
              estado: 1,
              serviceLayer: false
            })
            promises.push(responseDetalle)
            const responseDetalleOv = updateFacturacionMasivaResponseDetalleOvSapRepository({
              facturacionMasivaDetalleId: item.id,
              NumFactura: item.NumFacturaResponse,
              Comentarios: 'OK',
              Estado: 1
            })
            promises.push(responseDetalleOv)
            console.log("FACTURA DE CAPITA GENERADA...",resp.data ? resp.data : " FALLO ");
          } else {
            console.log('NO TIENE FACTURA CTCH-->', error.response)
            console.log('hasta aqui', error.response.data)
            const responseDetalle = updateRepository({
              id: item.id,
              NumFacturaResponse: null,
              response: error.response ? error.response.data.message : 'Error desconocido',
              estado: 2,
              serviceLayer: false
            })
            promises.push(responseDetalle)
    
            const responseDetalleOv = updateFacturacionMasivaResponseDetalleOvSapRepository({
              facturacionMasivaDetalleId: item.id,
              NumFactura: null,
              Comentarios: error.response ? error.response.data.message : 'Error desconocido',
              Estado: 2
            })
            promises.push(responseDetalleOv)
          }
          
        });
      }
    }
    Promise.all(promises).then((res) =>{
      console.log('tiempo--------------->', inicio.diff(dayjs(), 'second') )
      console.log('AQUI TERMINA DE FATURAR-------------------------', res)
    })

  }).catch(err => {
    console.log('ENTRO POR EL CATCH------------>', err)
    console.error(err)
  })
}



