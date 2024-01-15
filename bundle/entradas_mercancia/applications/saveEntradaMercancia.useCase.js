const listPreliminarEntradaMercancia = require('../infrastructure/repositories/listPreliminaresEntradasMercancia.repository');
const PurchaseDeliveryNotes = require('../services');
const saveEntradaMercancia = require('../infrastructure/repositories/saveEntradaMercancia.repository');

module.exports = async () => {
  console.log('Entradas de mercancia !!!');
  
  const _PurchaseDeliveryNotes = new PurchaseDeliveryNotes();
  const _ListPreliminares = await listPreliminarEntradaMercancia();
  
  for (const element of _ListPreliminares) {
    let data = {
      ...JSON.parse(element.TextJson)
    }
    const result = await _PurchaseDeliveryNotes.create(data);
    
    await saveEntradaMercancia(result,element);
  }
}