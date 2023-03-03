const orm = require('../database/orm/raw.orm')
const axios = require('axios')
const axiosWS = require('./axiosWebService')

module.exports = async (tipo = 'SISPRO SUMINISTROS') => {
    try {
        // listar las apis, "token, nit, url api"
        const sql_ = `select papis.url, papis."user", papis."password" from "parametrizacion_apis" papis
            where papis.descripcion = '${tipo}'
            limit 10`
        const parametrizacion_apis = await orm(sql_, {}, { plain: true })
        if (parametrizacion_apis) {
            const tokken_secundario = await axiosWS(`${parametrizacion_apis.url}/${parametrizacion_apis.user}/${parametrizacion_apis.password}`)
            return {
                tokken_secundario,
                nit: parametrizacion_apis.user,
            }
        }else{
          throw new Error('No se encontro la parametrizacion de la api')
        }
    } catch (error) {
        console.log('errorrr webservice', error);
        throw error
    }
}