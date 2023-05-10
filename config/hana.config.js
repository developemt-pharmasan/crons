module.exports = {
    development: {
        host: process.env.DEV_HANA_HOST,
        port: process.env.DEV_HANA_PORT,
        uid: process.env.DEV_HANA_USER,
        pwd: process.env.DEV_HANA_PASS,
        charset: "UTF-8",
        currentSchema: process.env.DEV_HANA_SCHEMA,
        compress: true,
        pooling: true,
        routeDirectExecute: true,
        maxPoolSize: 10
    },
    test: {
        host: process.env.TEST_HANA_HOST,
        port: process.env.TEST_HANA_PORT,
        uid: process.env.TEST_HANA_USER,
        pwd: process.env.TEST_HANA_PASS,
        charset: "UTF-8",
        currentSchema: process.env.TEST_HANA_SCHEMA,
        compress: true,
        pooling: true,
        routeDirectExecute: true,
        maxPoolSize: 10
      },
    production: {
        host: process.env.PRO_HANA_HOST,
        port: process.env.PRO_HANA_PORT,
        uid: process.env.PRO_HANA_USER,
        pwd: process.env.PRO_HANA_PASS,
        charset: "UTF-8",
        currentSchema: process.env.PRO_HANA_SCHEMA,
        compress: true,
        pooling: true,
        routeDirectExecute: true,
        maxPoolSize: 10
    }
};

  