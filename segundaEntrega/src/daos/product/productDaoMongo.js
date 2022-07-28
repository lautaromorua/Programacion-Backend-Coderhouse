import ContenedorMongo from '../../containers/contenedorMongo.js';

class ProductDaoMongo extends ContenedorMongo {
    constructor() {
        super('productos', {
            timestamp: { type: String, required: true },
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            codigo: { type: String, required: true },
            url: { type: String, required: true },
            precio: { type: Number, required: true },
            stock: { type: Number, required: true },
        });
    }
}

export default ProductDaoMongo;