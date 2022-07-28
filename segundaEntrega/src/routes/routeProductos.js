import { Router } from 'express';
const router = Router();
import { getAll, getById, postProduct, updateProduct, deleteById } from '../controllers/controllerProductos.js';

const isAdmin = (admin) => {
    return ((req, res, next) => {
        if (admin === true) {
            next();
        } else {
            res.send('Acceso denegado')
        }
    })
}

router.get('/', getAll)

router.get('/:id', getById)

router.post('/', isAdmin(true), postProduct)

router.put('/:id', isAdmin(true), updateProduct)

router.delete('/:id', isAdmin(true), deleteById)

export default router;