import { cartDao } from '../DAOS/cart/cart.dao.js';
import { productDao } from '../DAOS/product/product.dao.js';

const addProductACart = async (req, res) => {

    const product = await cartDao.createNewCart(req, res)

    res.render('templateInfo', { msj: 'Agregaste el producto al carrito' })
};

const getCart = async (req, res) => {
    const cart = await cartDao.getUserCartById(req.session.passport.user)
    console.log('Carrito creado', cart)

    if (cart[0]) {
        const products = await productDao.getAllProducts(cart[0].products)
        res.render('templateCarts', {
            data: req.user,
            products: products,
            cart: cart[0].id
        })
    } else {
        res.render('errorCart', {
            data: 'No hay productos en el carrito'
        })
    }
};

const deleteProduct = async (req, res) => {
    const cart = await cartDao.deleteProductInCart(req, res)
    res.render('templateInfo', { msj: 'Producto Eliminado' })
};

export default {
    getCart,
    deleteProduct,
    addProductACart,
};