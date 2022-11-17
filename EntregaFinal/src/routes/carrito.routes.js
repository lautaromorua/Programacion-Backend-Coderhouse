import { Router } from 'express';
import cartController from '../controllers/carrito.controller.js'
import { isLogged } from '../middleware/checkAuth.js'
const router = Router();

router.
    route('/')
    .get(isLogged, cartController.getCart)

router
    .route('/:id')
    .post(isLogged, cartController.addProductACart)

router
    .route('/:cartID/:prodID')
    .post(cartController.deleteProduct)

export default router;