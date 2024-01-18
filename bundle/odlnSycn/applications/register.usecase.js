const { OdlnSync } = require('../../../database/models');
const listPending = require('../infrastructure/repositories/listPending.repository')
const sapLines = require('../infrastructure/repositories/sapLines.repository')
const dayjs = require("dayjs");
const lodash = require("lodash");
module.exports = async () => {
  try {
    const _listPending = await listPending().catch(e => console.log(e.message))
    const _sapLines = await sapLines(_listPending);
    const register = []
    const _groupNumOv = lodash.groupBy(_listPending, 'NumOv')
    for (const item of Object.values(_groupNumOv)) {
      const _BaseEntry = item[0].BaseEntry
      const _BaseRef = item[0].BaseRef
      const _NumOv = item[0].NumOv
      const _TextJson = {
        "DocDate": item[0].DocDate,
        "U_PG_IdOv": _NumOv,
        "DocumentLines": []
      }
      /** agrupar por pgLine ( Articulo )*/
      _DocumentLines = _sapLines.filter(x => x.BaseEntry === _BaseEntry)
      let lineNum = 0
      for (const _itemLines of _DocumentLines) {
        const _line = {
          "BaseEntry": _itemLines.BaseEntry,
          "BaseType": "17",
          "BaseLine": _itemLines.BaseLine,
          "Quantity": lodash.sumBy(_listPending.filter(x => x.ItemCode === _itemLines.ItemCode), 'BatchQuantity'),
          "U_PG_IdOv": _NumOv,
          "U_PG_IdOvDt": _itemLines.U_PG_IdOvDt,
          "BatchNumbers": [],
          "DocumentLinesBinAllocations": [],
        }
        let BaseLineNumber = 0
        for (const lineBatch of _listPending.filter(x => x.ItemCode === _itemLines.ItemCode)) {
          _line.BatchNumbers.push(
            {
              "BatchNumber": lineBatch.BatchNumber,
              "Quantity": lineBatch.BatchQuantity,
              "BaseLineNumber": lineNum
            }
          )
          _line.DocumentLinesBinAllocations.push({
            "BinAbsEntry": lineBatch.AbsEntry,
            "Quantity": lineBatch.BatchQuantity,
            "AllowNegativeQuantity": "tNO",
            "SerialAndBatchNumbersBaseLine": BaseLineNumber,
            "BaseLineNumber": lineNum
          })
          BaseLineNumber++
        }
        _TextJson.DocumentLines.push(_line)
        lineNum++
      }
      const _OdlnSync = {
          Envio: dayjs().subtract(5, 'h').format('YYYYMMDD'),
          NumOv: _NumOv,
          BaseRef: _BaseRef,
          BaseEntry: _BaseEntry,
          Status: 1,
          TextJson: JSON.stringify(_TextJson)
      }
      register.push(_OdlnSync)
    }
    await  OdlnSync.bulkCreate(register)
  } catch (e) {
    console.log("generar Json entregas", e.message)
  }
}