import { contenedorMongoProd, contenedorMongoCart } from "../containers/contenedorMongo.js"
import Users from '../utils/userModel.js'

const controllerLogin = async (req, res) => {
    if (req.isAuthenticated()) {
        console.log('Usuario ya logueado')
        res.redirect('/productos/all')
    } else {
        console.log('Por favor, ingresa sus credenciales')
        await res.render('loginTemplate.ejs')
    }
}

const controllerLoginSucces = async (req, res) => {
    req.session.user = req.body.username

    const userLogg = await Users.getByUsername(req.session.user)

    req.session.email = userLogg.email
    req.session.userID = userLogg.userID
    req.session.phoneNumber = userLogg.phoneNumber
    req.session.avatar = req.session.avatar

    const userCart = await contenedorMongoCart.getByUserId(req.session.userID)
    req.session.cartID = userCart._id

    res.redirect('productos/all')
    //const productos = await contenedorMongoProd.getAll()
} //{ productos, username: req.session.username }

const controllerLogout = (req, res) => {
    req.session.destroy()
    res.render('cerrarSesion.ejs', { username: req.session })
}

const controllerLoginError = async (req, res) => {
    await res.render('errorLogin.ejs')
}

export { controllerLogin, controllerLogout, controllerLoginSucces, controllerLoginError };