import contenedorFirebase from '../../containers/contenedorFirebase.js';

class cartDaoFirebase extends contenedorFirebase {
    constructor() {
        super('compras');
    }
};

export default cartDaoFirebase;