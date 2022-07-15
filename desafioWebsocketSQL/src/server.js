const express = require('express');
const chatContainer = require('../src/chat');
const { Server: IOServer } = require('socket.io');
const databaseChat = require('../src/db/database').connectionSQLite;
const contenedorProductos = require('../src/controllers/controllerProductos');
const routes = require('./routes/routesP').router
const path = require('path');
const app = express();
const PORT = 8080;
const chat = new chatContainer(databaseChat, 'chats')

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/productos', routes);

app.use((req,res) =>{
    res.status(404).json({ error: 'Ruta no encontrada'})
});

app.use((err,req,res,next)=>{
    res.status(500).json({ error: err.mensaje});
});

const expressServer = app.listen(PORT, () => {
    try{
        console.log(`El servidor está escuchando el puerto: ${PORT}`)
    }
    catch(error){
        console.log("Ocurrió el siguiente error al iniciar: ", error);
    }
});

const io = new IOServer(expressServer);

io.on('connection', async socket => {

    console.log('Se conectó el cliente con id: ', socket.id);
    
    socket.emit('server:products', await contenedorProductos.getAllP());

    socket.on('client:product', async productoInfo => {
        contenedorProductos.save(productoInfo)
        io.emit('server:products', producto);
    })

    socket.emit('server:messeges', await chat.getAll());

    socket.on('client:message', async msgInfo => {
        chat.save(msgInfo);
        io.emit('server:messeges', await chat.getAll());

        console.log(`el cliente ${socket.id} envió un mensaje`)
    })
});
