import { Products } from "../../models/product.model.js";

const getAllProducts = async () => {
    const products = await Products.find();
    return products;
}

const createProduct = async (req, res) => {
    const product = await Products.create(req.body)
    console.log('creado', product)
}

const getProductById = async (products) => {
    return await Products.findById({
        '_id': { $in: products }
    })
}

const updateProduct = async (req, res) => {

    const fieldsArray = Object.entries(req.body)
    const filtered = fieldsArray.filter(([key, value]) => value != "")
    const fields = Object.fromEntries(filtered)

    const { name, description, code,
        url, price, stock, id } = req.body

    const update = await Products.updateOne({ _id: id }, { $set: fields })
}

const deleteProduct = async (req, res) => {
    const prodDelete = await Products.deleteOne({ _id: req.body.id })
}

export const productDao = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}