class ContenedorMongo {
    constructor(nameCollection, esquema) {
        this.collection = mongoose.model(nameCollection, new mongoose.Schema(esquema));
    }

    async getAll() {
        const docs = await this.collection.find({}, { __v: 0 })
        return docs
    }

    async getById(id) {
        const doc = await this.collection.find({ id }, { __v: 0 })
        return doc;
    }

    async postProduct(objeto) {
        objeto.timestamp = new Date().toLocaleString();
        const newProd = new this.collection(objeto)
        let newProdSave = await newProd.save()
        return newProdSave;
    }

    async updateProduct(id, objeto) {

        let response;
        await this.collection.findByIdAndUpdate(id, objeto, function (err, doc) {
            if (err) {
                response = err;
            } else {
                response = doc
            }
        }).clone();

        return response;
    }

    async deleteById(id) {

        let response;
        await this.collection.findByAndDelete(id, {}, function (err, doc) {
            if (error) {
                response = err
            } else {
                response = doc
            }
        }).clone()

        return response;
    }

    async createCart() {
        const newCart = { timestamp: '', productos: [] }
        const response = await this.collection.save(newCart);
        return response.id;
    }

    async addProductACart(cartID, objeto) {

        let response;
        const cart = await this.collection.getById(cartID)
        if (!cart) {
            response = 'ID de carrito no encontrado'
        } else {
            cart.productos.push(objeto)
            await this.collection.updateProduct(cartID, objeto)
            response = 'Producto agregado al carrito'
        }

        return response;
    }

    async deleteProdCart(cartID, productID) {

        let resultado;
        const cart = await this.collection.getById(cartID);
        if (cart) {
            let arrayProd = cart.productos
            const index = arrayProd.findIndex(producto => {
                return producto._id === productID
            });

            if (index >= 0) {
                arrayProd.splice(index, 1)
                await this.collection.findByIdAndUpdate(cartID, { productos: arrayProd });
                resultado = 'Producto eliminado'
            } else {
                resultado = 'El producto no existe en el carrito'
            }
        } else {
            resultado = 'El carrito no existe'
        }
        return resultado;
    }
}

export default ContenedorMongo