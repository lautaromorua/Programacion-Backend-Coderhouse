import { Router } from 'express';
import { getAllProducts, getById, postProduct, updateProduct, deleteById } from '../controllers/controllerProductos.js';
const router = Router();

router.get('/', getAllProducts)
router.get('/:id', getById)
router.post('/', postProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteById)

export default router;

