import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    autor: {
        nombre: { type: String, required: true },
        email: { type: String, required: true }
    },
    texto: { type: String },
    fecha: { type: String },
});

const Chats = mongoose.model('Chats', chatSchema)

export { Chats }