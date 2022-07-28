import { Router } from 'express';
const router = Router();
import { getNewCart, addProductACart, deleteCart, getCartProducts, deleteById } from '../controllers/controllerCarrito.js'

const isAdmin = (admin) => {
    return ((req, res, next) => {
        if (admin === true) {
            next();
        } else {
            res.send('Acceso denegado')
        }
    })
}

router.get('/', getNewCart);

router.get('/:id/productos', isAdmin(true), getCartProducts);

router.post('/:id/productos', addProductACart);

router.put('/:id/productos', isAdmin(true), getCartProducts);

router.delete('/:id', isAdmin(true), deleteCart);

router.delete('/:id/productos/:id_prod', deleteById);

export default router;