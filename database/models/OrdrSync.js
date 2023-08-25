'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class OrdrSync extends Model {
    static associate (models) {
      // define association here
    }
  }
  OrdrSync.init({
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
    DocNum: DataTypes.INTEGER,
    DocEntry: DataTypes.INTEGER,
    Valor: DataTypes.INTEGER,
	  CreatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OrdrSync',
    tableName: 'ORDR_SYNC',
    schema: 'sap_business',
    timestamps: false
  })
  return OrdrSync
}
