import { Cart } from "../models/cartModel.js"

const cartDAO = {

    async getById(id) {
        const doc = await Cart.find({ _id: id }, {products: 1, _id:0})
        return doc[0].products
    },

    async getAll(){
        const doc = await Cart.find({})
        return doc
    },

    async createDocument(document){
        const doc = await Cart.insertMany(document)
        return doc[0]._id
    },

    async updateDocument(id, paramsToUpdate){
        const doc = await Cart.updateOne({ _id: id }, {$set: paramsToUpdate})
        return "Documento actualizado en la base :)"
    },

    async deleteById(id){
        const doc = await Cart.deleteOne({ _id: id })
        return "Documento eliminado de la base :)"
    },

    async deleteProductInCart(cartId, productId){
        const cart = await Cart.find({ _id: cartId })
        const productsInCar = cart[0].products
        const newCartProducts = productsInCar.filter( product => product.productId != productId )

        const doc = await Cart.updateOne({ _id: cartId }, { $set: { products : newCartProducts }} )
 
        return `Producto eliminado del carrito :)`
    }

}

export { cartDAO }