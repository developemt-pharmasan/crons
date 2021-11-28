const {Schema,createConnection} = require('mongoose')
const config = require('../config/database.config')

const conn = createConnection(config.connections.manager.uri,(err)=>{
  if(err) console.log('manager',err.message);
})

const suscripcionSchema = new Schema({
  razonSocial: {
    type: String,
    max: 140,
    required: true
  },
  nit: {
    type: String,
    max: 40,
    required: true,
    // unique:true
  },
  database:{
    type: String,
    required: true,
    max:140
  },
  correo:{
    type: String,
    max:255,
    // unique: true
  },
  password:{
    type: String,
    max:255,
  },
  foto:{
    type: String,
    max:255
  },
  createdAt:{
    type: Date,
    default: new Date
  },
  updatedAt:{
    type: Date,
    default: new Date
  },
})

module.exports = conn.model('Suscripcion',suscripcionSchema,'suscripciones')