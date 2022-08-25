import { CartDao as contenedorCarrito } from '../daos/index.js'

const getNewCart = async (req, res) => {
    try {
        const response = await contenedorCarrito.createCart();
        return res.send(response)
    } catch (e) {
        console.log('Ocurrio un error al crear el carrito', e);
        res.sendStatus(500)
    }
};

const getCartProducts = async (req, res) => {
    try {
        const response = await contenedorCarrito.getById(req.params.id);
        return res.send(response)
    } catch (e) {
        console.log("Ocurrio un error al obtener los productos del carrito:", e);
        res.sendStatus(500)
    }
};

const deleteCart = async (req, res) => {
    try {
        let response = await contenedorCarrito.deleteCart(req.params.id);
        if (!response) {
            return res.send("El id de carrito no existe");
        } else {
            return res.sendStatus(200);
        }
    } catch (error) {
        console.log("Ocurrio un error al querer eliminar el carrito", error);
        res.sendStatus(500);
    }
};


const addProductACart = async (req, res) => {
    try {
        const response = await contenedorCarrito.addProductACart(req.params.id, req.body.id);
        return res.send(response)
    } catch (e) {
        console.log('Ocurrio un error al agregar el producto al carrito', e);
        res.sendStatus(500)
    }
};

const deleteById = async (req, res) => {
    try {
        const response = await contenedorCarrito.deleteById(req.params.id, req.params.id_prod);
        return ({ response: 'Response' })
    } catch (e) {
        console.log('Ocurrio un error al eliminar el producto  del carrito', e);
        res.sendStatus(500)
    }
};

export {
    getNewCart,
    getCartProducts,
    deleteCart,
    addProductACart,
    deleteById
};