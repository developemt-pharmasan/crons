const axios = require("axios");
module.exports = async () => {
  try {
    const response = await axios.get('https://intranet.pharmasan.net/index.php/cron/crear_pendientes_evento');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}