const express = require('express');
const app = express();
const {GetPaises,NewPais,GetPais,DeletePais,UpdatePais} = require('./pais');
const {check} = require('express-validator');
const { validacionesCampos } = require('../../middlewares/validaciones');
const { existeNombrePais } = require('../../helpers/validacionesDb');
const { ValidaJWT } = require('../../middlewares/validaJWT')

async function getPaises(req,res){
    try{
        let respuesta = await GetPaises();
        res.send(respuesta);
    }
    catch(e){
        res.send("Error buscando paises.");
    }
}

async function getPais(req,res){
    try{
        let id = req.params.id;
        let respuesta = await GetPais(id);
        res.send(respuesta);
    }
    catch(e){
        res.send("Error buscando pais.");
    }
}

async function deletePais(req,res){
    try{
        let id = req.params.id;
        let respuesta = await DeletePais(id);
        res.send(respuesta);
    }
    catch(e){
        res.send("Error eliminando pais.");
    }
}

async function updatePais(req,res){
    try{
        let id = req.params.id;
        let pais = req.body;

        let respuesta = await UpdatePais(id,pais);
        res.send(respuesta);
    }
    catch(e){
        res.send("Error actualizando pais.");
    }
}

async function newPais(req,res){
    try{
        let pais = req.body;
        let respuesta = await NewPais(pais);
        res.send(respuesta);
    }
    catch(e){
        res.send("Error ingresando paises.");
    }
}

//GET
app.get("/api/paises",getPaises);
app.get("/api/paises/:id",getPais);

//POST
app.post("/api/paises",[
    ValidaJWT,
    check('id','El id es obligatorio').not().isEmpty(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre','Ingrese nombre superior a 3 caracteres').isLength({min:4}),
    //node check('nombre').custom(existeNombrePais),
    validacionesCampos
],newPais);

//DELETE
app.delete("/api/paises/:id",deletePais);

//UPDATE
app.put("/api/paises/:id",updatePais);

module.exports = app;