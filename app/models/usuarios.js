const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    nombre:{
        type: String,
        unique: true
    },
    mail:{
        type: String
    },
    clave:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    },
    rol:{
        type: String,
        enum:['PUBLIC','ADMIN'],
        default:'PUBLIC'
    }
},{
    timestamps:true,
    versionKey: false
})

usuariosSchema.methods.toJSON = function() {
    const { clave, ...usuario} = this.toObject();
    return usuario;
}

module.exports = mongoose.model('usuarios',usuariosSchema,'usuarios');