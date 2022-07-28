class Contenedor {
    constructor(database, table){
        this.database = database;
        this.table = table;
    }

    async save(objeto){
        try {
            const id = await this.database(this.table).insert(objeto)
            objeto.id = id[0]
            console.log(`Producto guardado con ID ${objeto.id}`)
            return objeto        
        } catch (error) {
            console.log('Error al guardar producto: ', error)
            return ({error: 'Error producto no guardado'})
        }
    }

    async saveById(id, objeto){
        try {
            const Nid = await this.database.from(this.table).where('id', '=', 'id').update(objeto)
            if(Nid === 0){
                return ({ error: `Producto con ID ${id} no encontrado`})
            } else {
                return ({ success: `Producto con ID ${id} actualizado`})
            }
        } catch (error) {
            console.log('Error al actualizar producto')
            return ({ error: `Error producto no actualizado`})
        }
    }

    async getById(id) {
        try {
            const productos = await this.database.from(this.table).where({id})
            if (productos[0]) {
                return productos[0]
            } else {
                return { error: `Producto de ID ${id} no encontrado` }
            }
        } catch (err) {
            console.log("Error al buscar producto", err)
            return {error: "Producto no encontrado"}
        }
    }

    async getAll(){
        try {
            const productos = await this.database.from(this.table).select("*")
            return productos;
        } catch (err) {
            if(err.errno === 1146){
                const createTable = require('../src/db/productos/create_table_productos')
                await createTable();
                console.log('Tabla creada con exito')
                return []
            } else {
                console.log('Error al buscar productos')
                return ({ error: 'Productos no encontrados'})
            }
        }
    }

    async deleteById(id){
        try {
            const Nid = await this.database(this.table).where({id}).del()
            if(Nid === 0){
                return ({ error: `Producto con ID ${Nid} no encontrado`})
            } else {
                return ({ success: `Producto con ID ${Nid} eliminado`})
            }
        } catch (error) {
            console.log('Error al eliminar producto')
            return ({ error: `Error, producto no eliminado`})
        }
    }
}

module.exports = Contenedor;