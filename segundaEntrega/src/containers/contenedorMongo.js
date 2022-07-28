import config from '../config.js';
import mongoose from 'mongoose';

await mongoose.connect(config.mongodb.connectionString);

class ContenedorMongo {
    constructor(nameCollection, schema) {
        this.collection = mongoose.model(nameCollection, schema);
    }

    async save(objeto) {
        try {
            const newProd = new this.collection(objeto)
            const newProdSave = await newProd.save()
            return (newProdSave);

        } catch (error) {
            console.log('Error al guardar' + error)
        }
    }

    async getAll() {
        try {
            const docs = await this.collection.find({}, { __v: 0 })
            return docs

        } catch (error) {
            console.log("Error al obtener productos", error);
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.find({ id }, { __v: 0 })
            return doc;
        } catch (error) {
            console.log('Error al obtener producto', error);
        }
    }

    async updateProduct(id, objeto) {
        try {
            let response;
            await this.collection.findByIdAndUpdate(id, objeto, function (err, doc) {
                if (err) {
                    response = err;
                } else {
                    response = doc
                }
            }).clone();

            return response;

        } catch (error) {
            console.log("Error al actualizar producto", error);
        }
    }

    async deleteById(id) {
        try {
            let response;
            await this.collection.findByAndDelete(id, {}, function (err, doc) {
                if (error) {
                    response = err
                } else {
                    response = doc
                }
            }).clone()

            return response;

        } catch (error) {
            console.log("Error al eliminar por ID", error);
        }
    }

    async createCart() {
        try {
            const newCart = { timestamp: '', productos: [] }
            const response = await this.collection.save(newCart);
            return response.id;

        } catch (error) {
            console.log("Error al guardar carrito", error);
        }
    }

    async addProductACart(cartID, objeto) {
        try {
            let response;
            const cart = await this.getById(cartID)
            if (!cart) {
                response = 'ID de carrito no encontrado'
            } else {
                cart.productos.push(objeto)
                await this.collection.updateProduct(cartID, objeto)
                response = 'Producto agregado al carrito'
            }

            return response;

        } catch (error) {
            console.log("Error al agregar al carrito", error);
        }
    }

    async deleteProdCart(cartID, productID) {
        try {
            let response;
            let resultado;
            const cart = await this.collection.getById(cartID);
            if (!cart) {
                response = 'ID de carrito no encontrado'
            } else {
                let arrayProd = cart.productos
                const index = arrayProd.findIndex(producto => {
                    return producto._id === productID
                });
                if (index > 0) {
                    arrayProd.splice(index, 1)
                    await this.collection.findByIdAndUpdate(cartID, { productos: arrayProd })
                    resultado = 'Producto eliminado'
                } else {
                    resultado = 'El producto no existe en el carrito'
                }
            }

            return resultado;

        } catch (error) {
            console.log("Error al  eliminar", error);
        }
    }
}

export default ContenedorMongo;