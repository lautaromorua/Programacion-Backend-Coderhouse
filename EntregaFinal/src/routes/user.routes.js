import { Router } from 'express'
import usersController from '../controllers/user.controller.js'
import { auth } from '../middleware/checkAuth.js'
const router = Router()

router.get('/', auth, usersController.controllerLogout)
router.get('/loginError', usersController.controllerLoginError)


export default router