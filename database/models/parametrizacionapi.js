'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParametrizacionApi extends Model {
    static associate(models) {/* define association here*/}
  }
  const options = {
    sequelize,
    modelName: 'ParametrizacionApi',
    tableName: 'parametrizacion_apis',
  };
  ParametrizacionApi.init({
    descripcion: DataTypes.STRING,
    user: DataTypes.STRING,
    password: DataTypes.STRING,
    url: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, options);
  return ParametrizacionApi;
};