import { Router } from "express";
const router = Router()
import passport from "passport";

import {
    controllerRegister,
    controllerRegisterError,
    controllerRegisterSuccess
} from '../controllers/controllerRegister.js'

router.get('/', controllerRegister)
router.post('/register', passport.authenticate('register', { failureRedirect: '/registerError' }), controllerRegisterSuccess)
router.get('/registerError', controllerRegisterError)

export default router;