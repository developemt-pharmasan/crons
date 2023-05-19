const typeorm = require("typeorm");
const { v4: uuid } = require('uuid');
module.exports = async () => {
    const env = process.env.NODE_ENV || 'development';
    const config = require('../../config/typeorm.config')[env];
    return typeorm.createConnection({
        name:uuid(),
        username: config.username,
        password: config.password,
        schema: config.schema,
        host: config.host,
        port: config.port,
        type: "sap",
        logging: true,
        entities: [
          require(__dirname + '/entities/recepcionpedidocabecera.entity'),
        ]
    }).then(async (DataSource) =>{
        return DataSource;
    }).catch((error) => {
        throw error
    });
}