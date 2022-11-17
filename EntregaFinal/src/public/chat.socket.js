import { Server } from "socket.io";
import { createMessage, getMessages } from "../DAOS/chat.dao.js";

const socket = (expressServer) => {
    const io = new Server(expressServer);

    io.on('connection', async (socket) => {
        console.log(`Se conecto un usuario nuevo con el ID ${socket.id}`);

        let messages = await getMessages();
        socket.emit('server:msgs', messages);

        socket.on('cliente:msg', async (msgInfo) => {
            await createMessage(msgInfo);
            let messages = await getMessages();
            socket.emit('server:msgs', messages);
        });
    });
};

export default socket;