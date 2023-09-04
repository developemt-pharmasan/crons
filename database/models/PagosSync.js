'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PagosSync extends Model {
    static associate (models) {
      // define association here
    }
  }
  PagosSync.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	  DocDate: DataTypes.DATEONLY,
	  TextJson: DataTypes.TEXT,
	  ServicelayerResponse: DataTypes.TEXT,
	  Status: DataTypes.INTEGER,
	  CreatedBy: DataTypes.INTEGER,
	  NumOv: DataTypes.INTEGER,
    Valor: DataTypes.INTEGER,
    CreatedAt: DataTypes.DATE,
    DocNum: DataTypes.INTEGER,
    DocEntry: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PagosSync',
    tableName: 'ORCT_SYNC',
    schema: 'sap_sync',
    timestamps: false
  })
  return PagosSync
}
