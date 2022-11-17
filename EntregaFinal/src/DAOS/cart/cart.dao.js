import { Cart } from '../../models/cart.model.js'
import { Products } from '../../models/product.model.js';


const createNewCart = async (req, res) => {
    const existCart = await Cart.findOne({ user_id: req.session.passport.user })
    const productID = await Products.findOne({ _id: req.params.id })

    if (existCart) {
        existCart.products.push(req.params.id);
        await existCart.save();

        return productID

    } else {
        const newCart = new Cart({ user_id: req.session.passport.user, products: req.params.id })
        await newCart.save()

        return productID
    }
};

const getUserCartById = async (id) => {
    const cartUser = await Cart.find({ user_id: id })
    return cartUser
}

const deleteProductInCart = async (req, res) => {
    let cart = await Cart.findById(req.params.cartID)

    let productsCart = cart.products.findIndex(p => p._id == req.params.prodID)

    cart.products.splice(productsCart, 1)

    let updated = await Cart.updateOne({ _id: req.params.cartID }, { $set: { products: cart.products } })

    return `Producto eliminado del carrito`
}

const emptyCart = async (req, res) => {
    const cart = await Cart.findOne({ user_id: req.session.passport.user })
    const empty = await Cart.updateOne({ _id: cart.id }, { $set: { products: [] } })
}

export const cartDao = {
    createNewCart,
    getUserCartById,
    deleteProductInCart,
    emptyCart
};