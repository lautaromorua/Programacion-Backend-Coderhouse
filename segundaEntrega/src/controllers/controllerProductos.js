import { productDao } from "../daos/index.js";

const getAll = async (req, res) => {
    try {
        const response = await productDao.getAll();
        res.send(response);
    } catch (error) {
        console.log('Error al obtener los productos', error)
        res.sendStatus(500);
    }
};

const getById = async (req, res) => {
    try {
        const response = await productDao.getById(req.params.id);
        if (!response) {
            res.send('El ID del producto no existe')
        } else {
            res.send(response)
        }
    } catch (error) {
        console.log('Ocurrio un error al obtener el producto de la DB', error)
        res.sendStatus(500)
    }
}

const postProduct = async (req, res) => {
    try {
        await productDao.save(req.body);
        res.sendStatus(200)
    } catch (error) {
        console.log('Ocurrio un error al guardar el producto', error)
        res.sendStatus(500)
    }
}

const updateProduct = async (req, res) => {
    try {
        const response = await productDao.updateProduct(req.params.id, req.body);
        if (!response) {
            console.log('El ID del producto no existe')
        } else {
            res.send(200)
        }
    } catch (error) {
        console.log('Ocurrio un error al actualizar el producto')
        res.sendStatus(500)
    }
}

const deleteById = async (req, res) => {
    try {
        const response = await productDao.deleteById(req.params.id);
        if (!response) {
            res.send('El ID del producto no existe')
        } else {
            res.send(200)
        }
    } catch (error) {
        console.log('Ocurrio un error al eliminar el producto')
        res.sendStatus(500)
    }
}

export { getAll, getById, postProduct, updateProduct, deleteById }