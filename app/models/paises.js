const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paisesSchema = new Schema({
    id:{
        type: Number,
        required: [true,'id es obligatorio'],
        unique: true
    },
    nombre:{
        type: String
    },
    continente:{
        type: String,
        enum:['ASIA','AFRICA','AMERICA','EUROPA','OCEANIA'],
        default:'AMERICA'
    },
    habitantes:{
        type: Number,
        default:0
    }
},{
    timestamps:true,
    versionKey: false
})

module.exports = mongoose.model('paises',paisesSchema,'paises');