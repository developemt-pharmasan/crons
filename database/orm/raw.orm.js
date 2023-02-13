const {sequelize} = require('../models');
module.exports = async (sql,replacements= {}, options = {}) => {
    return sequelize.query(sql,{
        replacements: replacements,
        type: sequelize.QueryTypes.SELECT,
        logging: true,
        ...options
    });
}