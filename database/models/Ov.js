'use strict'
const { Model } = require('sequelize')
const dayjs = require('dayjs')

module.exports = (sequelize, DataTypes) => {
  class Ov extends Model {
    static associate (models) {
      models.Ov.hasMany(models.OvDt, {
        foreignKey: 'DocId',
        as: 'DocumentLines'
      })
      models.Ov.hasMany(models.PagosSync, {
        foreignKey: 'NumOv',
        as: 'IncomingPayments'
      })
    }
  }

  Ov.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    CardCode: DataTypes.STRING,
    U_PHR_Bodega: DataTypes.STRING,
    U_PHR_NumDcto: DataTypes.STRING,
    U_ACS_TpoIdentf: DataTypes.STRING,
    U_PHR_RangSalarial: DataTypes.STRING,
    U_PHR_Exorera: DataTypes.STRING,
    U_PHR_AutoEntrega: DataTypes.STRING,
    U_PHR_AutPendiente: DataTypes.STRING,
    U_PHR_PagaPhr: DataTypes.STRING,
    U_PHR_Autorizacion: DataTypes.STRING,
    U_PHR_MotAutoriza: DataTypes.STRING,
    U_PHR_DiagnosPpal: DataTypes.STRING,
    U_PHR_DiagnosSecu: DataTypes.STRING,
    U_PHR_NumTurno: DataTypes.STRING,
    U_PHR_NumPagoReci: DataTypes.STRING,
    U_PHR_PorCuota: DataTypes.STRING,
    U_PHR_SumaHomologo: DataTypes.STRING,
    U_PHR_SumaCR: DataTypes.STRING,
    U_PHR_ExModera: DataTypes.STRING,
    U_PHR_CtMod: DataTypes.STRING,
    U_PHR_RegPac: DataTypes.STRING,
    U_PHR_Zonificacion: DataTypes.STRING,
    U_PHR_Portabilidad: DataTypes.STRING,
    U_PHR_CodMunicipio: DataTypes.STRING,
    U_PHR_Zonificacion_Port: DataTypes.STRING,
    // U_PHR_RegMed: DataTypes.STRING, // se elimina el  campo
    // U_PHR_IPSPrest: DataTypes.STRING, // se elimina el  campo
    U_PHR_UserWsUpd: DataTypes.STRING,
    U_PHR_ModContrato: DataTypes.STRING,
    DocStatus: DataTypes.INTEGER,
    Comments: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
    deletedBy: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
    FechaContabilizacion: DataTypes.DATE,
    FechaDocumento: {
      type: DataTypes.DATE,
      get () {
        const date = this.getDataValue('FechaDocumento')
        return date ? dayjs(date).format('YYYY-MM-DD') : null
      }
    },
    DocTotal: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Ov',
    tableName: 'OV',
    schema: 'sap_business',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    paranoid: true,
  })
  return Ov
}
