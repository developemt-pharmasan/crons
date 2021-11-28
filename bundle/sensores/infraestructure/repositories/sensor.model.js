const { Schema } = require('mongoose');
const SensorSchema = new Schema({
    dispositivoId: {
        type: Schema.ObjectId,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: Number,
        required: true,
    },
    rangoMinimo: {
        type: Number,
        required: true
    },
    rangoMaximo: {
        type: Number,
        required: true
    },
    estado: {
        type: Number,
        required: true
    },
    intervalo: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    updatedAt: {
        type: Date,
        default: new Date
    },
});
module.exports = SensorSchema;