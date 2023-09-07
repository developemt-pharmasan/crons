'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class OrdnSync extends Model {
        static associate (models) {
            // define association here
        }
    }
    OrdnSync.init({
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
        NumEnt: DataTypes.INTEGER,
        NumOv: DataTypes.INTEGER,
        DocNum: DataTypes.INTEGER,
        DocEntry: DataTypes.INTEGER,
        Valor: DataTypes.INTEGER,
        CreatedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'OrdnSync',
        tableName: 'ORDN_SYNC',
        schema: 'sap_sync',
        timestamps: false
    })
    return OrdnSync
}
