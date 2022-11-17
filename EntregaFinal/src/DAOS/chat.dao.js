import { Chats } from '../models/chat.model.js'

const createMessage = async (msg) => {
    const message = await Chats.create(msg)
}

const getMessages = async () => {
    const messages = await Chats.find()
    return messages;
}

export { createMessage, getMessages }