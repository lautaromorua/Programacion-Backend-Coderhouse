import { connectionSQLite as database } from '../database';

const createTableChat = async () => {
    try {
        await database.dropTableIfExists('Chats')

        await database.schema.createTable('Chats', chatTable => {
            chatTable.increments('id').primary();
            chatTable.string('Nombre', 20).notNullable();
            chatTable.string('Mensaje', 50).notNullable();
            chatTable.string('Fecha', 20).notNullable();
        })
        console.log('Chat table created')
        database.destroy()
    } catch (error) {
        console.log(error)
    }
}

export default createTableChat;