import { Router } from 'express';
import infoRoute from './infoRoute.js'
import randomRoute from './randomRoute.js'
const router = Router()
import { upload } from '../middleware/multerMidd.js'
import passport from "passport";
import checkAdmin from '../middleware/checkAuth.js'
import { getNewCart, addProductACart, deleteCart, getCartProducts, deleteById, getUserCartController, cartControllerPurchase } from '../controllers/controllerCarrito.js'
import { getAllProducts, getById, postProduct, updateProduct, deleteProdById } from '../controllers/controllerProductos.js';
import { controllerLogin, controllerLoginError, controllerLogout, controllerLoginSucces } from '../controllers/controllerLogin.js'
import { controllerRegister, controllerRegisterError, controllerRegisterSuccess } from '../controllers/controllerRegister.js'

router.use('/info', infoRoute)
router.use('/randoms', randomRoute)

//rutas register
router.get('/register', controllerRegister)
router.post('/register', upload.single('userAvatar'), passport.authenticate("register", { failureRedirect: '/registerError' }), controllerRegisterSuccess)
router.get('/registerError', controllerRegisterError)

//rutas login
router.get('/login', controllerLogin)
router.post('/login', passport.authenticate("login", { failureRedirect: '/loginError' }), controllerLoginSucces)
router.get('/logout', checkAdmin, controllerLogout)
router.get('/loginError', controllerLoginError)


//rutas productos
router.get('/productos/all', checkAdmin, getAllProducts)
router.get('/productos/:id', checkAdmin, getById)
router.post('/productos', checkAdmin, postProduct)
//router.put('/:id', checkAdmin, updateProduct)
//router.delete('/:id', checkAdmin, deleteProdById)

//rutas carritos
router.post('/carts', getNewCart);
router.get('/carts/:id/productos', getCartProducts);
router.get('/carts/userCart', getUserCartController);
router.post('/carts/:cart_id/product_id/:product_id', addProductACart)
router.post('/carts/compra', cartControllerPurchase);
router.delete('/carts/:id', deleteCart);
router.delete('/carts/:id/productos/:id_prod', deleteById);

export default router;
