const jwt = require('jsonwebtoken');

const generaJWT = (usuario)=>{
    return new Promise((resolve,reject)=>{
        const payload = { usuario };
        jwt.sign(payload,process.env.SECRETKEY,{
            expiresIn:'2h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject("No se pudo generar token.");
            }
            else{
                resolve(token);
            }
        })
    })
}

module.exports = {
    generaJWT
}