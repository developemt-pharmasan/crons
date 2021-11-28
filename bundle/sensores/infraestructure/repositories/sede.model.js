const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Sede = new Schema({
    ciudadId: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    updatedAt: {
        type: Date,
        default: new Date
    }
})
module.exports = Sede