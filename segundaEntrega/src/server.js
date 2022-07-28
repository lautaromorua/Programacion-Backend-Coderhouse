import express from 'express';
import { Server } from 'socket.io';
import routes from './routes/index.js'
import path from 'path';
import cors from 'cors';
import http from 'http';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const puerto = process.env.PORT || 8080;

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', routes);
app.use('/*', (req, res) => {
    res.sendStatus(404).send('Ruta no implementada');
})

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

import databaseChat from './db/database.js'
import chatContainer from './chat.js'
const chat = new chatContainer(databaseChat.connectionSQLite, 'chats')

io.on('connection', async socket => {

    console.log('Se conectó el cliente con id: ', socket.id);

    // socket.emit('server:products', await controllerProductos.getAll());

    // socket.on('client:product', async productoInfo => {
    //     contenedorProductos.save(productoInfo)
    //     io.emit('server:products', producto);
    // })

    socket.emit('server:messeges', await chat.getAll());

    socket.on('client:message', async msgInfo => {
        chat.save(msgInfo);
        io.emit('server:messeges', await chat.getAll());

        console.log(`el cliente ${socket.id} envió un mensaje`)
    })
});

server.listen(puerto, (error) => {
    try {
        console.log(`El servidor está escuchando el puerto ${puerto}`)
    } catch {
        console.log(`Error al iniciar el server`, error);
    }
});