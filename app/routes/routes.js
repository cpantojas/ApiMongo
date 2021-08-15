const express = require('express');
const app = express();

app.use(require('../controllers/paises/pais.routes'))
app.use(require('../controllers/usuarios/usuario.routes'))

module.exports = app;