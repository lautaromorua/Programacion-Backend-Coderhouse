import { Router } from 'express';
import infoRoute from './info.routes.js';
import productsRoute from './products.routes.js';
import cartsRoute from './carrito.routes.js';
import randomRoute from './random.routes.js';
import orderRoute from './tickets.routes.js';
import userRoute from '../routes/user.routes.js'
import controllerAdmin from '../controllers/adminPanel.controller.js'
import { auth } from '../middleware/checkAuth.js';
let router = Router()

router.get('/', (req, res) => { res.redirect('/productos') })

router.use('/productos', productsRoute)
router.use('/carrito', cartsRoute)
router.use('/chat', (req, res) => res.redirect('/chat.html'))
router.use('/order', orderRoute)
router.use('/chat', (req, res) => { res.redirect('/chat.html') })

//rutas register
router.use('/register', (req, res) => { res.render('registerTemplate') })

//rutas login
router.use('/login', (req, res) => { res.render('loginTemplate') })
router.use('/logout', userRoute)

router.use('/adminPanel', auth, controllerAdmin.adminPanel)


router.use('/info', infoRoute)
router.use('/randoms', randomRoute)

router.get('*', (req, res) => {
    res.render('error', { data: 'Error 404 not found' })
})

export default router;
