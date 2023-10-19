'use strict';
const {	Model } = require('sequelize');
// const { afterCreate, afterUpdate } = require('../hooks/Logs');

module.exports = (sequelize, DataTypes) => {
	class Ips extends Model {
		static associate(models) {
			// define association here
		}
	}

	Ips.init({
		Id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		IdIps: DataTypes.STRING,
		NomIps: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
		deletedAt: DataTypes.DATE,
		createdBy: DataTypes.INTEGER,
		updatedBy: DataTypes.INTEGER,
		deletedBy: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Ips',
		tableName: 'IPS',
		schema: 'sap_business',
		paranoid: true,
		hooks: {
			// afterCreate: afterCreate(sequelize,'IPS'),
			// afterUpdate: afterUpdate(sequelize,'IPS')
		}
	});
	return Ips;
};