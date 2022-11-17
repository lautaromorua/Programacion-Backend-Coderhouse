import { Router } from 'express';
import { checkAdmin } from '../middleware/checkAuth.js'
import productController from '../controllers/productos.controller.js'

const router = Router();

router
    .route('/')
    .get(productController.getAllProducts)

router
    .route('/loadProduct')
    .get(checkAdmin, (req, res) => { res.render('loadProduct') })
    .post(checkAdmin, productController.postProduct)

router
    .route('/updateProduct')
    .get(checkAdmin, productController.updateList)
    .post(checkAdmin, productController.updateProduct)

router
    .route('/deleteProduct')
    .post(checkAdmin, productController.deleteProd)

export default router;

