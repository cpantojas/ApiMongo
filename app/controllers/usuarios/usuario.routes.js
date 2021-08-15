const express = require('express');
const app = express();
const {GetUsuarios,NewUsuario,GetUsuario,DeleteUsuario,UpdateUsuario,LoginUsuario} = require('./usuario');

async function getUsuarios(req,res){
    try{

        //console.log(req.query);

        let respuesta = await GetUsuarios();
        res.send(respuesta);
    }
    catch(e){
        res.send("Error buscando usuarios.");
    }
}

async function getUsuario(req,res){
    try{
        let nombre = req.params.nombre;
        let respuesta = await GetUsuario(nombre);
        res.send(respuesta);
    }
    catch(e){
        res.send("Error buscando usuario.");
    }
}

async function deleteUsuario(req,res){
    try{
        let nombre = req.params.nombre;
        let respuesta = await DeleteUsuario(nombre);
        res.send(respuesta);
    }
    catch(e){
        res.send("Error eliminando usuario.");
    }
}

async function updateUsuario(req,res){
    try{
        let nombre = req.params.nombre;
        let usuario = req.body;

        let respuesta = await UpdateUsuario(nombre,usuario);
        res.send(respuesta);
    }
    catch(e){
        res.send("Error actualizando usuario.");
    }
}

async function newUsuario(req,res){
    try{
        let usuario = req.body;
        let respuesta = await NewUsuario(usuario);
        res.send(respuesta);
    }
    catch(e){
        res.send("Error ingresando usuario.");
    }
}


//LOGIN
app.post('/api/login/',LoginUsuario);

//GET
app.get("/api/usuarios",getUsuarios);
app.get("/api/usuarios/:nombre",getUsuario);

//POST
app.post("/api/usuarios",newUsuario);

//DELETE
app.delete("/api/usuarios/:nombre",deleteUsuario);

//UPDATE
app.put("/api/usuarios/:nombre",updateUsuario);

module.exports = app;