import { connectionMysql as database } from '../database';

const createTableProductos = async () => {
    try {
        //await database.dropTableIfExists('Productos')

        await database.schema.createTable('Productos', createTableP => {
            createTableP.increments('id').primary();
            createTableP.string('Nombre', 30).notNullable();
            createTableP.string('imagenURL', 400).notNullable();
            createTableP.integer('Precio').notNullable();
        })
        console.log('Products table created')
        database.destroy();
    } catch (error) {
        console.log('Error:', error)
    }
}

export default createTableProductos;