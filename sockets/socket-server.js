const socketController = (socket) => {
    console.log("Datos del socket" + socket.id)

    socket.on("disconnect",()=>{
        console.log("cliente desconectado",socket.id);
    })

    socket.on("envia-mensaje",(data)=>{
        socket.broadcast.emit('envia-mensaje',data);
    })
}

module.exports = {
    socketController
}