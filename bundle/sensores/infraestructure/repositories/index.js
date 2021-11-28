module.exports = (conn)=> {
  conn.model('Notificacion', require('./notificacion.model'), 'Notificaciones')
  conn.model('Dispositivo', require('./dispositivo.model'), 'Dispositivos')
  conn.model('Sensor', require('./sensor.model'), 'Sensores')
  conn.model('Bitacora', require('./bitacora.model'), 'Bitacoras')
  conn.model('Sede', require('./sede.model'), 'Sedes')
  return conn
}
