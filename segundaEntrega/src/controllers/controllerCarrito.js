import { cartDao } from "../daos/index.js";

const getNewCart = async (req, res) => {
    try {
        const response = await cartDao.createCart();
        res.send(response)
    } catch (e) {
        console.log('Ocurrio un error al crear el carrito', e);
        res.sendStatus(500)
    }
};

const getCartProducts = async (req, res) => {
    try {
        const response = await cartDao.getById(req.params.id);
        res.send(response)
    } catch (e) {
        console.log("Ocurrio un error al obtener los productos del carrito:", e);
        res.sendStatus(500)
    }
};

const deleteCart = async (req, res) => {
    try {
        let response = await cartDao.deleteCart(req.params.id);
        if (!response) {
            res.send("El id de carrito no existe");
        } else {
            res.sendStatus(200);
        }
    } catch (error) {
        console.log("Ocurrio un error al querer eliminar el carrito", error);
        res.sendStatus(500);
    }
};


const addProductACart = async (req, res) => {
    try {
        const response = await cartDao.addProductACart(req.params.id, req.body.id);
        res.send(response)
    } catch (e) {
        console.log('Ocurrio un error al agregar el producto al carrito', e);
        res.sendStatus(500)
    }
};

const deleteById = async (req, res) => {
    try {
        const response = await cartDao.deleteById(req.params.id, req.params.id_prod);
        console.log('Response', response)
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