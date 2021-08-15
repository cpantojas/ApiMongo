const estadoServerOn = document.querySelector('#estadoServerOn');
const estadoServerOff = document.querySelector('#estadoServerOff');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

socket.on("connect",()=>{
    console.log("conectado");
    estadoServerOff.style.display='none';
    estadoServerOn.style.display='';
})


socket.on("disconnect",()=>{
    console.log("desconectado");
    estadoServerOff.style.display='';
    estadoServerOn.style.display='none';
})

socket.on("envia-mensaje",(data)=>{
    console.log(data);
})

btnEnviar.addEventListener('click',()=>{
    const mensaje=txtMensaje.value;
    socket.emit('envia-mensaje',mensaje);
})