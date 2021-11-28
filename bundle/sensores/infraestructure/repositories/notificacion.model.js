const {Schema} = require('mongoose')
module.exports =  new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date
  }
})