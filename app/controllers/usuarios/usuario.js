const Usuario = require('../../models/usuarios');
const { generaJWT } = require('../../helpers/generarToken');
const usuarios = require('../../models/usuarios');


async function GetUsuarios(){
    let data = await Usuario.find({});
    return data;
}  

async function GetUsuario(nombre){
    let data = await Usuario.findOne({nombre:nombre});
    return data;
}

async function DeleteUsuario(nombre){
    let data = await Usuario.deleteOne({nombre:nombre});
    return data;
}

async function UpdateUsuario(nombre,usuario){
    let data = await Usuario.findOneAndUpdate({nombre:nombre},usuario,{
        returnOriginal: false
      });
    return data;
}


async function NewUsuario(usuario){
    const {nombre,mail,clave,estado,rol} = usuario;
    let nuevoUsuario = new Usuario({
        nombre,
        mail,
        clave,
        estado,
        rol
    })
    let data = await nuevoUsuario.save();	
    return data;
}

const LoginUsuario = async (req,res) =>{
    const {nombre,clave} = req.body;
    const user = await usuarios.findOne({nombre,clave});
    if(!user){
        return res.status(400).json({
            mensaje:"Login incorrecto"
        })
    }
    const token = await generaJWT(user.nombre)
    res.json({
        usuario:user.nombre,
        token
    })
}

module.exports = {
    GetUsuarios,
    GetUsuario,
    NewUsuario,
    DeleteUsuario,
    UpdateUsuario,
    LoginUsuario
}