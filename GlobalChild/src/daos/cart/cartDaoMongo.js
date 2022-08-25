import contenedorMongo from '../../containers/contenedorMongo.js';

class CartDaoMongo extends contenedorMongo {
    constructor() {
        super('compras', {
            timestamp: { type: Date, required: true },
            productos: { type: Array, required: true }
        });
    }
}

export default CartDaoMongo;