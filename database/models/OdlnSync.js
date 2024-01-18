
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class OdlnSync extends Model {
    static associate (models) {
      // define association here
    }
  }
  OdlnSync.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    NumOv: DataTypes.INTEGER,
    Envio: DataTypes.INTEGER,
    BaseRef: DataTypes.INTEGER,
    BaseEntry: DataTypes.INTEGER,
    DocNum: DataTypes.INTEGER,
    DocEntry: DataTypes.INTEGER,
    Status: DataTypes.INTEGER,
    TextJson: DataTypes.TEXT,
    ErrorResponse: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'OdlnSync',
    tableName: 'ODLN_SYNC',
    schema: 'sap_sync',
    timestamps: false
  })
  return OdlnSync
}

