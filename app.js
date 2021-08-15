require("./app/config/config.js");
const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');



const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { socketController } = require('./sockets/socket-server')


app.use(cors());
app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan("common"));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

/*app.use(function(req,res,next){
    //req.username = req.query.nombre.toUpperCase();
    //console.log("Entro al middleware "+ req.username);
    console.log(`Hora de ingreso al server : ${ Date.now() }`);
    req.query.nombre = req.query.nombre.toUpperCase();
    req.query.rol="PUBLIC";
    next();
})*/

app.use(require('./app/routes/routes'));

io.on('connection',socketController);

mongoose.connect(process.env.Mongo,{
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(resp=>{
    console.log("Conexion exitosa a DB.")
}).catch(resp=>{
    console.log("ERROR en conexion a DB.")
})

//app.listen(PORT,()=>{
//    console.log(`Server en ejecucion: ${PORT} `);
//})


server.listen(PORT,()=>{
    console.log(`Server en ejecucion: ${PORT} `);
})