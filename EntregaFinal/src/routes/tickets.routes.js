import { Router } from "express";
import ticketController from '../controllers/ticket.controller.js'
const router = Router()

router.get('/', (req, res) => { res.redirect('/index') })

router
    .route('/sendTicket')
    .post(ticketController.sendTicket)




export default router