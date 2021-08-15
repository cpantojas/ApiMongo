const jwt = require('jsonwebtoken');

const ValidaJWT = (req,res,next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(403).json({
            msg: "No Tiene Token"
        })
    }
    try{
        const payload = jwt.verify(token,process.env.SECRETKEY);
        console.log(payload);
        next();
    }
    catch{
        return res.status(403).json({
            msg: "Token invalido"
        })
    }
}

module.exports = {
    ValidaJWT
}