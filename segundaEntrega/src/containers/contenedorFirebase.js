import admin from 'firebase-admin';
import config from '../config.js';

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore()

class ContenedorFirebase {
    constructor(nameDatabase) {
        this.collection = db.collection(nameDatabase);
    }

    async save(objeto) {
        try {
            const newProduct = this.collection.doc()
            await newProduct.create(objeto);
            return;
        } catch (error) {
            console.log('Error al guardar producto' + error)
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get()
            const data = doc.data();
            return { ...data, id };
        } catch (error) {
            console.log("Error al obtener productos", error);
        }
    }

    async getAll() {
        try {
            const products = await this.collection.get()
            const data = await products.doc()

            const response = data.map(product => ({
                id: product.id,
                data: product.data()
            }));

            return response;
        } catch (error) {
            console.log("Error al obtener productos", error);
        }
    }

    async eliminarPorId(id) {
        try {
            if (!id) {
                console.log(`Producto con ID ${id} no encontrado`)
            } else {
                const doc = await this.collection('productos').doc(id).delete()
                console.log(`Producto con ID ${id} eliminado`, doc)
            }
        } catch (error) {
            console.log("Error al eliminar por ID", error);
        }
    }

    async actualizarProducto(id, objeto) {
        try {
            const doc = await this.collection.doc(id).update(objeto)
            return (`Producto con ID ${id} actualizado`, doc)

        } catch (error) {
            console.log("Error al actualizar producto", error);
        }
    }

    async createCart() {
        try {
            const newCart = { timestamp: '', productos: [] };
            newCart.timestamp = new Date().toLocaleString()
            const response = await this.collection.add(newCart);

            return response.id
        } catch (error) {
            console.log("Error al crear carrito", error);
        }
    }

    async agregarProductoACarrito(cartID, objeto) {
        try {
            const prod = await this.collection.doc(cartID).update({
                productos: admin.firebase.FieldValue.arrayUnion(objeto)
            })

            return (`Producto agregado`, prod)
        } catch (error) {
            console.log("Error al agregar al carrito", error);
        }
    }

    async deleteProdCart(cartID, productID) {
        try {
            let response;
            await db.runTransaction(async (r) => {
                const doc = await r.get(this.collection.doc(cartID));
                const arrayProd = [];
                arrayProd.push = doc.data().productos
                const index = arrayProd.findIndex((producto) => {
                    return producto.id === productID
                });
                if (index > 0) {
                    arrayProd.splice(index, 1)
                    r.update(this.collection.doc(cartID), { productos: arrayProd })
                    response = `Producto eliminado del carrito N° ${cartID}`
                } else {
                    response = 'Error al eliminar el producto del carrito'
                }
            });

            return response;
        } catch (error) {
            console.log("Error al  eliminar", error);
        }
    }
}

export default ContenedorFirebase;