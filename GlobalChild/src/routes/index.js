import { Router } from 'express';
//import routeProductos from './routeProductos.js'
//import routeCarritos from './routeCarrito.js';
import controllerDatos from '../controllers/controllerDatos.js';
import controllerRandom from '../controllers/controllerRandom.js'
import { controllerLogin, controllerLoginError, controllerLogout, controllerLoginSucces } from '../controllers/controllerLogin.js'
import { controllerRegister, controllerRegisterError, controllerRegisterSuccess } from '../controllers/controllerRegister.js'
import { checkAdmin } from '../middleware/checkAuth.js'
import passport from 'passport';
const router = Router();

router.get('/home', (req, res) => {
    try {
        res.send('Estas en home')
    } catch (error) {
        console.log('Error', error)
        res.sendStatus(500).send('Error de servidor')
    }
});

router.get('/info', controllerDatos)
router.get('/random', controllerRandom)

router.get('/register', controllerRegister)
router.post('/register', passport.authenticate('register', { failureRedirect: '/registerError' }), controllerRegisterSuccess)
router.get('/registerError', controllerRegisterError)

router.get('/login', controllerLogin)
router.post('/login', passport.authenticate('login', { failureRedirect: '/loginError' }), controllerLoginSucces)
router.get('/logout', checkAdmin, controllerLogout)
router.get('/loginError', controllerLoginError)

//router.use('/productos', routeProductos);
//router.use('/carrito', routeCarritos);

export default router;
