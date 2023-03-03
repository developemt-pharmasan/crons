'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MipresFacturacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MipresFacturacion.init({
    IDInterna: DataTypes.INTEGER,
    IDFacturacion: DataTypes.INTEGER,
    NoPrescripcion: DataTypes.STRING,
    TipoTec: DataTypes.STRING,
    ConTec: DataTypes.INTEGER,
    TipoIDPaciente: DataTypes.STRING,
    NoIDPaciente: DataTypes.STRING,
    NoEntrega: DataTypes.INTEGER,
    NoSubEntrega: DataTypes.INTEGER,
    NoFactura: DataTypes.STRING,
    NoIDEPS: DataTypes.STRING,
    CodEPS: DataTypes.STRING,
    CodSerTecAEntregado: DataTypes.STRING,
    CantUnMinDis: DataTypes.STRING,
    ValorUnitFacturado: DataTypes.STRING,
    ValorTotFacturado: DataTypes.STRING,
    CuotaModer: DataTypes.STRING,
    Copago: DataTypes.STRING,
    FecFacturacion: DataTypes.DATE,
    EstFacturacion: DataTypes.INTEGER,
    FecAnulacion: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    entidadId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'MipresFacturacion',
    tableName: 'mipres_facturacion',
  });
  return MipresFacturacion;
};