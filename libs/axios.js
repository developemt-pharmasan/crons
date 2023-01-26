const axios = require('axios');
const https = require('node:https');
require('node:tls').DEFAULT_MIN_VERSION='TLSv1';
const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});
module.exports = instance