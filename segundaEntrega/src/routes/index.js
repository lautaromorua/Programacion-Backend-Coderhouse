import { Router } from 'express';
const router = Router();
import routeProductos from './routeProductos.js'
import routeCarritos from './routeCarrito.js';

router.get('/home', (req, res) => {
    try {
        console.log('Estas en home')
    } catch (error) {
        console.log('Error', error)
        res.sendStatus(500).send('Error de servidor')
    }
});

router.use('/productos', routeProductos);
router.use('/carrito/', routeCarritos);

export default router;