'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class OvDt extends Model {
    static associate (models) {
      models.OvDt.belongsTo(models.Ov, {
        foreignKey: 'DocId',
        as: 'Ov'
      })
      models.OvDt.hasOne(models.Medicos, {
        foreignKey: 'RegMedico',
        sourceKey: 'U_PHR_RegMed',
        as: 'Medico'
      })
      models.OvDt.hasOne(models.Ips, {
        sourceKey: 'U_PHR_IPSPrest',
        foreignKey: 'Id',
        as: 'Ips'
      })

    }
  }

  OvDt.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ItemCode: DataTypes.STRING,
    WarehouseCode: DataTypes.STRING,
    Quantity: DataTypes.INTEGER,
    DelivrdQty: DataTypes.INTEGER,
    OpenCreQty: DataTypes.INTEGER,
    UseBaseUnits: DataTypes.STRING,
    UnitsOfMeasurment: DataTypes.STRING,
    UnitPrice: DataTypes.STRING,
    U_PHR_SeguiEntrega: DataTypes.STRING,
    U_PHR_NumEntregas: DataTypes.STRING,
    U_PHR_Exonerado: DataTypes.STRING,
    U_PHR_CuotaRecupe: DataTypes.STRING,
    U_PHR_CtdPrescrita: DataTypes.STRING,
    U_PHR_FecPrescrip: DataTypes.STRING,
    U_PHR_Frecuencia: DataTypes.STRING,
    U_PHR_DuraTratami: DataTypes.STRING,
    // U_PHR_RegMed: DataTypes.STRING,
    // U_PHR_NomMed: DataTypes.STRING,
    // U_PHR_IPSPrest: DataTypes.STRING,
    // U_PHR_MailIPS: DataTypes.STRING,
    U_PHR_CtoAsociado: DataTypes.STRING,
    U_PHR_CdHomologo: DataTypes.STRING,
    U_PHR_NomHomologo: DataTypes.STRING,
    U_PHR_CntHomologo: DataTypes.STRING,
    U_PHR_PrHomologo: DataTypes.STRING,
    U_PHR_TotalHomologo: DataTypes.STRING,
    U_PHR_NumAutoriza: DataTypes.STRING,
    U_PHR_FecAutoriza: DataTypes.STRING,
    U_PHR_NoAcCTC: DataTypes.STRING,
    U_PHR_FchAcCTC: DataTypes.STRING,
    U_PHR_FchSolActCTC: DataTypes.STRING,
    U_PHR_CodMipres: DataTypes.STRING,
    U_PHR_NumDirec: DataTypes.STRING,
    U_PHR_FecPres: DataTypes.STRING,
    U_PHR_JunMedi: DataTypes.STRING,
    U_PHR_Siniestro: DataTypes.STRING,
    CostingCode: DataTypes.STRING,
    U_PHR_Sta_Pen: DataTypes.STRING,
    FreeText: DataTypes.STRING,
    U_PHR_IdPrincipal: DataTypes.STRING,
    LineNum: DataTypes.STRING,
    DocId: DataTypes.INTEGER,
    LineStatus: DataTypes.INTEGER,
    U_PHR_RegMed: DataTypes.STRING,
    U_PHR_IPSPrest: DataTypes.INTEGER,
    CreatedBy: DataTypes.INTEGER,
    UpdatedBy: DataTypes.INTEGER,
    DeletedBy: DataTypes.INTEGER
  }, {
    sequelize,
    schema: 'sap_business',
    modelName: 'OvDt',
    tableName: 'OV_DT',
    paranoid: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
    deletedAt: 'DeletedAt'
  })
  return OvDt
}
