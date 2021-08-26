const cron = require('node-cron')

cron.schedule('* * * * * *',()=>{
    console.log(' funcionando cada segundo');
})