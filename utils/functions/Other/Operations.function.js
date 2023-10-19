const _orderBy = require('lodash/orderBy')
const _uniqueBy = require('lodash/uniqBy')
const _groupBy = require('lodash/groupBy')
const _map = require('lodash/map')
module.exports = class Operaciones {
  constructor () {
    this.groupedByAttribute = (array, attribute) => {
      const _groupedByAttribute = {}

      array.forEach((item) => {
        const _attribute = item[attribute]

        if (!_groupedByAttribute[_attribute]) {
          _groupedByAttribute[_attribute] = []
        }

        _groupedByAttribute[_attribute].push(item)
      })

      return _groupedByAttribute
    }
    this.validateLineStatus = (array) => {
      return array.some(x => x.LineStatus === 0) ? 0 : 1
    }
    this.addMovStock = (array) => {
      return array.filter(x => x.LineStatus === 1).map(item => {
        return {
          ObjectType: 15,
          ItemCode: item.ItemCode,
          BatchNumber: item.NumLote,
          Quantity: item.Quantity * (-1),
          WhsCode: item.WarehouseCode
        }
      })
    }
    this.arraySumatory = (array, attribute) => {
      return array.reduce((a, b) => parseInt(a) + parseInt(b[attribute]), 0)
    }
    this.sequelizeJson = (data) => {
      return JSON.parse(JSON.stringify(data, null, 2))
    }
    this.ordenarPorPropiedad = (array, propiedad) => {
      return _orderBy(array, [propiedad], ['asc'])
    }
    this.ordenarLineNum = (array) => {
      const conLineNum = array.filter(x => x.LineNum)
      const sinLineNum = []
      _map(_groupBy(array.filter(x => !x.LineNum), 'ItemCode'), (value, key) => {
        let contador = _uniqueBy(conLineNum, 'ItemCode').length
        for (const valueElement of value) {
          sinLineNum.push({
            ...valueElement,
            LineNum: contador
          })
        }
        contador++
      })
      return _orderBy([...conLineNum, ...sinLineNum], ['LineNum'], ['asc'])
    }
  }
}
