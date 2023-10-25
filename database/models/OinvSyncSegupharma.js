'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class OinvSyncSegupharma extends Model {
    static associate (models) {
      // define association here
    }
  }
  OinvSyncSegupharma.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    DocDate: DataTypes.DATEONLY,
    TextJson: DataTypes.TEXT,
    ServiceLayerResponse: DataTypes.TEXT,
    Status: DataTypes.INTEGER, 
    CreatedBy: DataTypes.INTEGER,
    NumOv: DataTypes.INTEGER,
    DocNum: DataTypes.INTEGER,
    DocEntry: DataTypes.INTEGER,
    Valor: DataTypes.INTEGER,
	  CreatedAt: DataTypes.DATE,
	  UpdatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OinvSyncSegupharma',
    tableName: 'OINV_SYNC',
    schema: 'sap_segupharma',
    timestamps: false
  })
  return OinvSyncSegupharma
}
