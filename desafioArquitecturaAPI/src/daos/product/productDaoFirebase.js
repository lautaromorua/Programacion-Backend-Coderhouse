import ContenedorFirebase from '../../containers/contenedorFirebase.js'

class ProductDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('producto');
    }
};

export default ProductDaoFirebase;