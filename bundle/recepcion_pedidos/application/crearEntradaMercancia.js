const getRecepcionesPendientes = require('../infrastructure/repositories/getRecepcionesPendientes.repository')
const updateRecepcion = require('../infrastructure/repositories/updateRecepcion.repository')
const getLineasCerradasPedido = require('../infrastructure/repositories/getLineasParaCerrar.repository')
const getDocEntryPedidos = require('../infrastructure/repositories/getDocEntriesPedido.repository')
const getDocEntryOfertaPedido = require('../infrastructure/repositories/getDocEntryOfertaPedido.repository')
const getLineasCerrarSolicitud = require('../infrastructure/repositories/getLineasCerrarSolicitud.repository')
const getLineasCerrarOferta = require('../infrastructure/repositories/getLineasCerrarOferta.repository')
const DataSource = require("../../../database/typeorm");
const catchError = require('../../../utils/errors/catch.error.utils')
const http = require('../../../libs/axios')
const baseUrl = process.env.SERVICE_LAYER_HOST
const procesarEntrada = async (entrada) => {
  let payload = {}
  await http.post(`${baseUrl}/purchase-delivery-notes`, JSON.parse(entrada.json), {
    headers: {
      'company': process.env.SERVICE_SLAYER_COMPANY,
      'module': 'recepcion_pedidos',
      'type': 'PurchaseDeliveryNotes',
      'Content-Type': 'application/json'
    },
  }).then(({data}) => {
    payload = {
      idRecepcion: entrada.DocEntry,
      estado: data.DocEntry ? 2 : 3,
      MsjRespuesta: JSON.stringify(data),
      DocNum: data.DocNum ? data.DocNum : null
    }
  }).catch((error) => {
    const data = catchError(error)
    payload = {
      idRecepcion: entrada.DocEntry,
      estado: 3,
      MsjRespuesta: JSON.stringify(data),
      DocNum: null
    }
  })
  await updateRecepcion(payload)
  payload.json = JSON.parse(entrada.json)
  return payload
}
const cerrarLineasPedidosAsociados = async (entradasExitosas, conn) => {
  const promesasCerrarPedido = []
  for (const ent of entradasExitosas) {
    /* se obtiene los ids de referencia (id del detalle de recepción y asi obtener el DocEntry del pedido en el que se basó la entrada */
    const numeroIdsRecepcion = [...new Set(ent.json.DocumentLines.map((x) => x.U_PHR_IdDocReferencia))]
    const numeroPedidos = await getDocEntryPedidos(conn, numeroIdsRecepcion)
    /* agrupa los datos de tal manera que cada posición sea un número de pedido, los ids de referencia y lineNum que poseen*/
    /* ejemplo:
    const originalArray = [
      {id: 1, BaseEntry: 175988, BaseLine: 0},
      {id: 2, BaseEntry: 175988, BaseLine: 1},
      {id: 3, BaseEntry: 175989, BaseLine: 0},
      {id: 4, BaseEntry: 175990, BaseLine: 1},
      {id: 5, BaseEntry: 175990, BaseLine: 2},
    ]; 
    
    resultado : 
    [
      {
        BaseEntry: 175988,
        idsAsociados: [ 1, 2 ],
        numeroLineasAsociadas: [ 0, 1 ]
      },
      {
        BaseEntry: 175989,
        idsAsociados: [ 3 ],
        numeroLineasAsociadas: [ 0 ]
      },
      {
        BaseEntry: 175990,
        idsAsociados: [ 4, 5 ],
        numeroLineasAsociadas: [ 1, 2 ]
      }
    ]
    * */
    const pedidos = numeroPedidos.reduce((accumulator, currentValue) => {
      const findPedido = accumulator.find(item => item.BaseEntry === currentValue.BaseEntry);
      if (findPedido) {
        findPedido.idsAsociados.push(currentValue.id);
        findPedido.numeroLineasAsociadas.push(currentValue.BaseLine);
      } else {
        accumulator.push({
          BaseEntry: currentValue.BaseEntry,
          idsAsociados: [currentValue.id],
          numeroLineasAsociadas: [currentValue.BaseLine]
        });
      }
      return accumulator;
    }, []);
    for (const pedido of pedidos) {
      const mdsPedido = [...new Set(ent.json.DocumentLines.filter((x) => pedido.idsAsociados.includes(x.U_PHR_IdDocReferencia)).map((a) => a.U_PHR_ItemCodSolicitado))]
      const lineasCerradas = await getLineasCerradasPedido(conn, pedido.BaseEntry, mdsPedido)
      const DocumentLines = lineasCerradas.map((x) => {
        return {
          LineNum: x.LineNum,
          DocEntry: pedido.BaseEntry,
          LineStatus: x.LineStatus
        }
      })
      if (DocumentLines.length) {
        promesasCerrarPedido.push(cerrarLineasPedidoServiceLayer(pedido, {DocumentLines}, conn))
      }
    }
  }
  return Promise.all(promesasCerrarPedido)
}
const cerrarLineasPedidoServiceLayer = async (pedido, DocumentLines, conn) => {
  return http.patch(`${baseUrl}/purchase-orders/${pedido.BaseEntry}`, DocumentLines, {
    headers: {
      'company': process.env.SERVICE_SLAYER_COMPANY,
      'module': 'recepcion_pedidos',
      'type': 'PurchaseOrders',
      'Content-Type': 'application/json'
    },
  }).then(async ({data}) => {
    console.log(`se cerraron las lineas del pedido ${pedido.BaseEntry}`)
    /* se inicia el proceso de cerrado de la oferta */
    const datosOferta = await getDocEntryOfertaPedido(conn, pedido)

    /* agrupa los datos de tal manera que cada posición sea un número de oferta, lineNum y solicitudes que posee 
    a su vez la posición de solicitudes esta agrupada de tal manera cada posición sea un numero de solicitud y sus lineNum que posee 
    EJ:
    resultado de consulta 
     [
      {
        "DocOferta": 506,
        "LineOferta": 0,
        "DocSol": 100835,
        "LineSol": 4
      },
      {
        "DocOferta": 506,
        "LineOferta": 0,
        "DocSol": 100835,
        "LineSol": 6
      },
      {
        "DocOferta": 506,
        "LineOferta": 1,
        "DocSol": 99978,
        "LineSol": 10
      },
      {
        "DocOferta": 506,
        "LineOferta": 1,
        "DocSol": 99992,
        "LineSol": 0
      },
      {
        "DocOferta": 506,
        "LineOferta": 1,
        "DocSol": 100308,
        "LineSol": 36
      },
      {
        "DocOferta": 507,
        "LineOferta": 2,
        "DocSol": 100300,
        "LineSol": 36
      }
    ]
    resultado : 
    [
      {
        DocOferta: 506,
        lineasAsoc: [ 0, 1 ],
        solicitudes: [
          { DocSol: 100835, lineasAsoc: [ 4, 6 ] },
          { DocSol: 99978, lineasAsoc: [ 10 ] },
          { DocSol: 99992, lineasAsoc: [ 0 ] },
          { DocSol: 100308, lineasAsoc: [ 36 ] }
        ]
      },
      {
        DocOferta: 507,
        lineasAsoc: [ 2 ],
        solicitudes: [ { DocSol: 100300, lineasAsoc: [ 36 ] } ]
      }
    ]
    */
    const ofertas = datosOferta.reduce((acumulador, oferta) => {
      const {DocOferta, DocSol, LineSol} = oferta;
      // Buscamos si la oferta ya está en el acumulador
      let ofertaEncontrada = acumulador.find(o => o.DocOferta === DocOferta);
      if (!ofertaEncontrada) {
        // Si la oferta no existe en el acumulador, la creamos
        ofertaEncontrada = {
          DocOferta,
          lineasAsoc: [],
          solicitudes: []
        };
        acumulador.push(ofertaEncontrada);
      }
      // Añadimos la línea asociada a la oferta solo si NO se encuentra ya en el listado
      if (!ofertaEncontrada.lineasAsoc.includes(oferta.LineOferta)) {
        ofertaEncontrada.lineasAsoc.push(oferta.LineOferta);
      }
      // Buscamos si la solicitud ya está en la oferta
      let solicitudEncontrada = ofertaEncontrada.solicitudes.find(s => s.DocSol === DocSol);

      if (!solicitudEncontrada) {
        // Si la solicitud no existe en la oferta, la creamos
        solicitudEncontrada = {
          DocSol,
          lineasAsoc: []
        };
        ofertaEncontrada.solicitudes.push(solicitudEncontrada);
      }
      // Añadimos la línea asociada a la solicitud
      solicitudEncontrada.lineasAsoc.push(LineSol);
      return acumulador;
    }, []);
    let promesasCerrarLineasOfertas = []
    for (const oferta of ofertas) {
      promesasCerrarLineasOfertas.push(cerrarLineasOfertas(conn, oferta))
    }
    await Promise.all(promesasCerrarLineasOfertas)
    return {success: true, message: data, DocEntry: pedido.BaseEntry}
  }).catch((error) => {
    const {message} = catchError(error)
    console.log(`Error al cerrar la linea del pedido ${pedido.BaseEntry}`, message)
    return {success: false, message, DocEntry: pedido.BaseEntry}
  })
}
const cerrarLineasOfertas = async (conn, oferta) => {
  const datosCierreOferta = await getLineasCerrarOferta(conn, oferta)
  const DocumentLines = datosCierreOferta.map((x) => {
    return {
      LineNum: x.LineNum,
      DocEntry: oferta.DocOferta,
      LineStatus: x.LineStatus
    }
  })
  console.log('cerrando lineas de Oferta', oferta.DocOferta, DocumentLines)
  if (DocumentLines.length) {
    return http.patch(`${baseUrl}/purchase-quotations/${oferta.DocOferta}`, {DocumentLines}, {
      headers: {
        'company': process.env.SERVICE_SLAYER_COMPANY,
        'module': 'recepcion_pedidos',
        'type': 'PurchaseQuotations',
        'Content-Type': 'application/json'
      },
    }).then(async ({data}) => {
      const promesasCerrarLineasSolicitud = []
      /* cierre de líneas de solicitudes asociadas a la oferta */
      for (const solicitud of oferta.solicitudes) {
        promesasCerrarLineasSolicitud.push(cerraLineasSolicitud(conn, solicitud))
      }
      await Promise.all(promesasCerrarLineasSolicitud)
      return {success: true, message: data, DocEntry: oferta.DocOferta}
    }).catch((error) => {
      const {message} = catchError(error)
      console.log(`Error al cerrar la linea de la oferta ${oferta.DocOferta}`, message)
      return {success: false, message, DocEntry: oferta.DocOferta}
    })
  }
  return false
}
const cerraLineasSolicitud = async (conn, solicitud) => {
  const datosCierreSolicitud = await getLineasCerrarSolicitud(conn, solicitud)
  const DocumentLines = datosCierreSolicitud.map((x) => {
    return {
      LineNum: x.LineNum,
      DocEntry: solicitud.DocSol,
      LineStatus: x.LineStatus
    }
  })
  console.log('cerrando lineas de Solicitud', solicitud.DocSol, DocumentLines)
  if (DocumentLines.length) {
    return http.patch(`${baseUrl}/purchase-requests/${solicitud.DocSol}`, {DocumentLines}, {
      headers: {
        'company': process.env.SERVICE_SLAYER_COMPANY,
        'module': 'recepcion_pedidos',
        'type': 'PurchaseRequests',
        'Content-Type': 'application/json'
      },
    }).then(async ({data}) => {
      return {success: true, message: data, DocEntry: solicitud.DocSol}
    }).catch((error) => {
      const {message} = catchError(error)
      console.log(`Error al cerrar la linea de la solicitud ${solicitud.DocSol}`, message)
      return {success: false, message, DocEntry: solicitud.DocSol}
    })
  }
}

module.exports = async () => {
  const conn = await DataSource();
  const entradas = await getRecepcionesPendientes(conn)
  const promesas = []
  for (const entrada of entradas) {
    promesas.push(procesarEntrada(entrada))
  }
  return Promise.all(promesas).then(async (data) => {
    const entradasExitosas = data.filter((x) => x.estado === 2)
    if (entradasExitosas.length) {
      return cerrarLineasPedidosAsociados(entradasExitosas, conn)
    }
    return []
  })
}