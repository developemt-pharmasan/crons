const { Schema } = require('mongoose')
const Dispositivo = new Schema({
    nombre: {
        type: String,
        required: true
    },
    serial: {
        type: String,
        required: true,
        unique: true
    },
    sedeId: {
        type: Schema.Types.ObjectId,
        ref: 'Sedes',
        required: true
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
});
module.exports = Dispositivo;