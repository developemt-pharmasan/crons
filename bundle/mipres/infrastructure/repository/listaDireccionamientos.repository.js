const {connect,hanaConfig, execute} = require('../../../../database/hanaClient')
module.exports = async (date) => {
    return new Promise(async (resolve, reject) => {
        const conn = await connect()
        conn.connect(hanaConfig, async function (err) {
            if (err) throw err;

                const sql_1 = `SELECT ID FROM MP_DIR 
                    WHERE TO_NVARCHAR("FecDireccionamiento", 'YYYY-MM-DD') = '${date}'`
                // const sql_1 = `INSERT INTO MP_DIR ${columns} VALUES (${texto.slice(1)})`
                const respuesta = await execute({conn,query:sql_1,params:[]})
            conn.disconnect()
            resolve(respuesta)

        });
    });
}