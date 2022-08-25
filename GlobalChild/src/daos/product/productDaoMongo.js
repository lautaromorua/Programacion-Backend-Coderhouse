import ContenedorMongo from '../../containers/contenedorMongo.js';
import mongoose from 'mongoose';

class ProductDaoMongo extends ContenedorMongo {
    constructor() {
        super("productos", {
            timestamp: { type: Date, required: true },
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            codigo: { type: Number, required: true },
            url: { type: String, required: true },
            precio: { type: Number, required: true },
            stock: { type: Number, required: true },
        })
    }
}

export default ProductDaoMongo;