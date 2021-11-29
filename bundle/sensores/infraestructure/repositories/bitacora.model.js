const {Schema} = require('mongoose');
const BitacoraSchema = new Schema({
    sensorId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    justification:{
        type: String,
        default: null
    },
    valor:{
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
    updatedBy:{
        type: Schema.Types.ObjectId,
        default: null
    }
});
module.exports = BitacoraSchema;