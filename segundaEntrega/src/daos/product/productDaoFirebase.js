import ContenedorFirebase from '../../containers/contenedorFirebase.js'

class productDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('producto');
    }
};

export default productDaoFirebase;