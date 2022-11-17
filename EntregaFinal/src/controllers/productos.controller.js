import { productDao } from '../DAOS/product/product.dao.js';

const getAllProducts = async (req, res) => {
    if (req.user) {
        const productos = await productDao.getAllProducts();
        res.render('index', {
            data: req.user,
            products: productos,
        })
    } else {
        res.render('index', {
            data: undefined,
            products: undefined
        })
    }
};

const postProduct = async (req, res) => {

    await productDao.createProduct(req, res)

    res.render('templateInfo.ejs', { msj: 'Producto agregado' })
};

const updateProduct = async (req, res) => {
    await productDao.updateProduct(req, res)
    res.render('templateInfo.ejs', { msj: 'Producto modificado' })
};

const deleteProd = async (req, res) => {
    await productDao.deleteProduct(req, res)
    res.render('templateInfo.ejs', { msj: 'Producto eliminado' })
};

const updateList = async (req, res) => {
    const products = await productDao.getAllProducts()
    res.render('updateProd', { data: products })
};

export default {
    getAllProducts,
    updateList,
    postProduct,
    updateProduct,
    deleteProd
};