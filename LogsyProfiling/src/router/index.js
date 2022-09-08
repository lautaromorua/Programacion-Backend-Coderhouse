import passport from 'passport';
import { Router } from "express";
import { productsTest } from "../controller/testController.js";
import { getAllProductsController,getOneProductController, postNewProduct } from "../controller/productsController.js";
import { cartControllerGet, cartControllerPost, cartControllerProductsPost, cartControllerDelete, cartControllerProductDelete } from "../controller/cartController.js";
import { loginController, loginPostController, logOutController, loginErrorController  } from "../controller/loginController.js";
import { registerController, registerPostController, registerErrorController } from "../controller/registerController.js";
import { logginMiddleware } from "../middleware/logginMiddleware.js";
import { infoController } from '../controller/infoController.js';
import { randomsController } from '../controller/randomsController.js';
import logger from '../utils/logger.js';


const router = Router()

//Rutas Test-Info-Random
router.get('/products-test', productsTest)
router.get('/info', infoController)
router.get('/randoms', randomsController)
router.get("/hola", (req, res) => {
    res.send("hoola".repeat(1000000))
})
//Rutas de register
router.get('/register', registerController)
router.post('/register', passport.authenticate("register", { failureRedirect: "/api/registerError" }), registerPostController)
router.get('/registerError', registerErrorController)

//Rutas Login-Loguot
router.get('/login', loginController)
router.post('/login', passport.authenticate("login", { failureRedirect: "/api/loginError" }), loginPostController )
router.get('/logout', logginMiddleware, logOutController)
router.get('/loginError', loginErrorController)

//Rutas de Producto
router.get('/products/all', logginMiddleware, getAllProductsController)
router.get('/products/:id', logginMiddleware, getOneProductController)
router.post('/products', logginMiddleware, postNewProduct )

//Rutas de carritos
router.get('/carts/:id/products', cartControllerGet)
router.post('/carts', cartControllerPost)
router.post('/carts/:id/products', cartControllerProductsPost)
router.delete('/carts/:id', cartControllerDelete)
router.delete('/carts/:id/products/:id_prod', cartControllerProductDelete)

//Rutas '*'
router.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

export default router