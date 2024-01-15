'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rcp_ent_merc_cab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rcp_ent_merc_cab.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    NumAtCard: DataTypes.STRING,
    DocDate: DataTypes.DATE,
    DocDueDate: DataTypes.DATE,
    TaxDate: DataTypes.DATE,
    Comments: DataTypes.STRING,
    JournalMemo: DataTypes.STRING,
    CardCode: DataTypes.STRING,
    CardName: DataTypes.STRING,
    TextJson: DataTypes.TEXT,
    ServiceLayerResponse: DataTypes.TEXT,
    Estado: DataTypes.INTEGER,
    CreatedBy: DataTypes.INTEGER,
    CreatedAt: DataTypes.DATE,
    DocEntry: DataTypes.INTEGER,
    DocNum: DataTypes.INTEGER,
    U_PHR_UserWs: DataTypes.STRING,
    DocTotal: DataTypes.DECIMAL(12, 2),
    NitProveedor: DataTypes.STRING,
    DeletedAt: DataTypes.DATE,
    DeletedBy: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Rcp_ent_merc_cab',
    tableName: 'RCP_ENT_MERC_CAB',
    schema: 'sap_business',
    timestamps: false,
  });

  return Rcp_ent_merc_cab;
};
