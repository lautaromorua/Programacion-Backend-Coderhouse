import { Chat } from "../models/chatModel.js"

const chatDAO = {

    getAll: async () => {
        const allMessages = await Chat.find( {}, { _id:1, __v:0 } )
        return allMessages
    },

    //metodo sujeto a revision
    postMessage: async (message) => {
        const doc = await Chat.insertMany(message)
    }

}

export { chatDAO }