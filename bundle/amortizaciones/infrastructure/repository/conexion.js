const { Sequelize } = require('sequelize');
const { development } = require('../../../../config/database')
module.exports = async () => {
  const sequelize = new Sequelize(development)
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return sequelize
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}