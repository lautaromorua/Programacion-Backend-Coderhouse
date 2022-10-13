import contenedorFirebase from '../../containers/contenedorFirebase.js';

class CartDaoFirebase extends contenedorFirebase {
    constructor() {
        super('compras');
    }
};

export default CartDaoFirebase;