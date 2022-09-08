import { productDAO } from "../DAO/productDAO.js"
import logger from "../utils/logger.js"

const getAllProductsController = async (req, res) => {
    try {
        // const { user } = req.session
        //Este req.user viene de la estrategia definida de passport.local y ya no hace falta recurrir al req.session
        const { email } = req.user
        const products = await productDAO.getAll()
    
        res.render("plantillaProducts.ejs", { email, products })
    } catch (error) {
        logger.error(error)
    }
}

const getOneProductController = async (req, res) => {
    try {
        const { id } = req.params
        const { email } = req.user
    
        const products = await productDAO.getById(id)
    
        res.render("plantillaProducts.ejs", { email, products })
    } catch (error) {
        logger.error(error)
        res.redirect('/api/products/all')
    }
}

const postNewProduct = async (req, res) => {
    try {
        const newProduct = req.body
        const { email } = req.user
    
        await productDAO.createDocument(newProduct)
        const products = await productDAO.getAll()
        
        res.render("plantillaProducts.ejs", { email, products })
    } catch (error) {
        logger.error(error)
        res.redirect('/api/products/all')
    }
}

export { getAllProductsController, getOneProductController, postNewProduct }