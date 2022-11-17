import { ticketDao } from "../DAOS/ticket.dao.js";
import { sendMail } from "../utils/nodemailer.js";
import { cartDao } from "../DAOS/cart/cart.dao.js";

const sendTicket = async (req, res) => {

    const newTicket = {
        nro: Date.now(),
        user: req.session.passport.user,
        products: req.body
    }

    const order = await ticketDao.newTicket(newTicket)

    sendMail('Nueva orden', `Nueva orden con el Nro ${newTicket.nro}
    con los productos ${newTicket.products}`)

    const empty = await cartDao.emptyCart(req, res)

    res.render('templateInfo.ejs', { msj: `Orden con enviada, Nro ${newTicket.nro}` })
}

export default {
    sendTicket
}