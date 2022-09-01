import { Router } from "express";
const router = Router()
import passport from "passport";
import checkAdmin from '../middleware/checkAuth.js'

import { controllerLogin, controllerLoginError, controllerLogout, controllerLoginSucces } from '../controllers/controllerLogin.js'

router.get('/', controllerLogin)
router.post('/login', passport.authenticate('login', { failureRedirect: '/api/loginError' }), controllerLoginSucces)
router.get('/logout', checkAdmin, controllerLogout)
router.get('/loginError', controllerLoginError)

export default router;