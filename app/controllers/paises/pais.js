const Pais = require('../../models/paises');


async function GetPaises(){
    let data = await Pais.find({});
    return data;
}

async function GetPais(id){
    let data = await Pais.findOne({id:id});
    return data;
}

async function DeletePais(id){
    let data = await Pais.deleteOne({id:id});
    return data;
}

async function UpdatePais(id,pais){
    let data = await Pais.findOneAndUpdate({id:id},pais,{
        returnOriginal: false
      });
    return data;
}


async function NewPais(pais){
    const {id,nombre,continente,habitantes} = pais;
    let nuevoPais = new Pais({
        id,
        nombre,
        continente,
        habitantes
    })
    let data = await nuevoPais.save();	
    return data;
}

module.exports = {
    GetPaises,
    GetPais,
    NewPais,
    DeletePais,
    UpdatePais
}