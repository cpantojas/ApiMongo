const paises = require('../models/paises')

const existeNombrePais = async (nombre)=>{
    let pais = await paises.findOne({nombre:nombre});
    if(pais){
        throw new Error(`El nombre ${nombre} ya esta ingresado.`);
    }
}

module.export = {
    existeNombrePais
}