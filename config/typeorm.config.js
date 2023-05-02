module.exports = {
    development: {
        username: process.env.DEV_DB_TYPE_ORM_USERNAME,
        password: process.env.DEV_DB_TYPE_ORM_PASSWORD,
        schema: process.env.DEV_DB_TYPE_ORM_SCHEMA,
        host: process.env.DEV_DB_TYPE_ORM_HOST,
        port: process.env.DEV_DB_TYPE_ORM_PORT,
        dbSap: process.env.DEV_DB_TYPE_ORM_SAP
    },
    test: {
        username: process.env.TEST_DB_TYPE_ORM_USERNAME,
        password: process.env.TEST_DB_TYPE_ORM_PASSWORD,
        schema: process.env.TEST_DB_TYPE_ORM_SCHEMA,
        host: process.env.TEST_DB_TYPE_ORM_HOST,
        port: process.env.TEST_DB_TYPE_ORM_PORT,
        dbSap: process.env.TEST_DB_TYPE_ORM_SAP
    },
    production: {
        username: process.env.PROD_DB_TYPE_ORM_USERNAME,
        password: process.env.PROD_DB_TYPE_ORM_PASSWORD,
        schema: process.env.PROD_DB_TYPE_ORM_SCHEMA,
        host: process.env.PROD_DB_TYPE_ORM_HOST,
        port: process.env.PROD_DB_TYPE_ORM_PORT,
        dbSap: process.env.PROD_DB_TYPE_ORM_SAP
    }
};
