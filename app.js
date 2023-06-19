import express from 'express';
import { Server } from 'socket.io';

const app = express(); 

const PORT =  process.env.PORT || 8080;

const serverHttp = app.listen(PORT, () => console.log('Server http running')) // Ponermos a escuchar nuestro server http y lo guardamos en serverHttp

const io = new Server(serverHttp); // Crear nuestro servidor websocket, pasando como parametro el server http

app.use(express.static('public'))

const mensajes = [];

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.emit('messages', mensajes) // emito solo al socket que se conectó

    socket.on('newUserLoged', user => {
        io.emit('newUser', user)
    })

    socket.on('message', data => {
        mensajes.push(data);
        io.emit("messages", mensajes) // emito a todos
    })
})