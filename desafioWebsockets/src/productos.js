const fs = require('fs');
class ContenedorProducts{
    constructor(file){
        this.file = "products";
    }
    async save (product) {
        try{
            const recordproducts = `Name: ${product.description}, Price: ${product.price}, Thumbnail: ${product.thumbnail}\n`;
            await fs.promises.appendFile(`./${this.file}.txt`, recordproducts);
            console.log("Mensaje guardado correctamente")
        } catch(error) {
            console.log(`Ocurrio el siguiente error al guardar el mensaje: ${error}`)
        }
    }
    async getAll () {
        let listadoProd = JSON.parse(await fs.promises.readFile(`./${this.file}.txt`, 'utf-8'));
        console.log("Listado de mensajes: ", listadoProd);
        return listadoProd;
    }
    async deleteAll () {
        await fs.promises.writeFile(`./${this.file}.txt`, '{}');
        return "Borrado con exito"
    }
};

module.exports = ContenedorProducts;