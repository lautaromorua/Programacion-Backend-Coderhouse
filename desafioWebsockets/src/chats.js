const fs = require('fs');
class Contenedor{
    constructor(file){
        this.file = "chats";
    }
    async save (message) {
        try{
            const recordMessages = `Fecha Y Hora: ${message.time}, Usuario: ${message.username}, Mensaje: ${message.message}\n`;
            await fs.promises.appendFile(`./${this.file}.txt`, recordMessages);
            console.log("Mensaje guardado correctamente")
        } catch(error) {
            console.log(`Ocurrio el siguiente error al guardar el mensaje: ${error}`)
        }
    }
    async getAll () {
        let listadoMsg = JSON.parse(await fs.promises.readFile(`./${this.file}.txt`, 'utf-8'));
        console.log("Listado de mensajes: ", listadoMsg);
        return listadoMsg;
    }
    async deleteAll () {
        await fs.promises.writeFile(`./${this.file}.txt`, '{}');
        return "Borrado con exito"
    }
};

module.exports = Contenedor;