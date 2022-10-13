import { Productos } from '../daos/product/productDaoMongo.js'
import { Cart } from '../daos/cart/cartDaoMongo.js'

const contenedorMongoProd = {

    async getById(id) {
        const doc = await Productos.find({ _id: id }).clone()
        return doc
    },

    async getAll() {
        const doc = await Productos.find({}).clone()
        return doc
    },

    async createDocument(document) {
        const doc = await Productos.insertMany(document)
        return doc[0]._id
    },

    async updateDocument(id, paramsToUpdate) {
        const doc = await Productos.updateOne({ _id: id }, { $set: paramsToUpdate })
        return "Documento actualizado en la base :)"
    },

    async deleteById(id) {
        const doc = await Productos.deleteOne({ _id: id })
        return "Documento eliminado de la base :)"
    }
}

const contenedorMongoCart = {

    async getById(id) {
        const doc = await Cart.find({ _id: id }, { productos: 1, user: 1, _id: 0 })
        return doc[0]
    },

    async getAll() {
        const doc = await Cart.find({})
        return doc
    },

    async getByUserId(userID) {
        const doc = await Cart.findOne({ userID })
        return doc
    },

    async createDocument(document) {
        const doc = await Cart.insertMany(document)
        return doc[0]._id
    },

    async updateDocument(id, paramsToUpdate) {
        const doc = await Cart.updateOne({ _id: id }, { $set: paramsToUpdate })
        return "Documento actualizado en la base :)"
    },

    async deleteById(id) {
        const doc = await Cart.deleteOne({ _id: id })
        return "Documento eliminado de la base :)"
    },

    async deleteProductInCart(cartId, productId) {
        const cart = await Cart.find({ _id: cartId })
        const productsInCar = cart[0].productos
        const newCartProducts = productsInCar.filter(product => product.productID != productId)

        const doc = await Cart.updateOne({ _id: cartId }, { $set: { products: newCartProducts } })

        return `Producto eliminado del carrito :)`
    }

}


export { contenedorMongoProd, contenedorMongoCart }

/*
class ContenedorMongo {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, new mongoose.Schema(schema, { timestamps: true }));
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
            if (err) {
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

export default ContenedorMongo;

*/