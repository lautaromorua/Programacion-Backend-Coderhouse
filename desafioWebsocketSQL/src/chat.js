class Chat {
    constructor(database, table){
        this.database = database;
        this.table = table
    }

    async save(mensaje){
        try {
            await this.database(this.table).insert(mensaje)
            return true
        } catch (error) {
            console.log('Error al guardar chat:', error)
            return false
        }
    }

    async getAll(){
        try {
            const mensajes = await this.database.from(this.table).select('*');
            return mensajes;
        } catch (err) {
            if(err.errno === 1){
                const createTable = require('../src/db/chats/create_table_chats');
                await createTable();
                console.log('Table creada')
                return [];
            } else {
                console.log('Error al buscar mensajes: ', err)
            }
        }
    }
}

module.exports = Chat;