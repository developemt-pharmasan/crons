'use strict'
const { Model } = require('sequelize')
// const { afterCreate, afterUpdate } = require('../hooks/Logs')

module.exports = (sequelize, DataTypes) => {
  class Medicos extends Model {
    static associate (models) {
      // define association here
    }
  }

  Medicos.init({
    RegMedico: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    NomMedico: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medicos',
    tableName: 'MEDICOS',
    paranoid: true,
    schema: 'sap_business',
    hooks: {
      // afterCreate: afterCreate(sequelize, 'MEDICOS'),
      // afterUpdate: afterUpdate(sequelize, 'MEDICOS')
    }
  })
  return Medicos
}
