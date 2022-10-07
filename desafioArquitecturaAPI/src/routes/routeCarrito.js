import { Router } from 'express';
import { getNewCart, addProductACart, deleteCart, getCartProducts, deleteById } from '../controllers/controllerCarrito.js'
const router = Router();

router.get('/', getNewCart);
router.get('/:id/productos', getCartProducts);
router.post('/:id/productos', addProductACart);
router.put('/:id/productos', getCartProducts);
router.delete('/:id', deleteCart);
router.delete('/:id/productos/:id_prod', deleteById);

export default router;