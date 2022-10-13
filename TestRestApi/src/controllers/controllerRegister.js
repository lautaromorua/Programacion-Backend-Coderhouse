import { contenedorMongoCart } from "../containers/contenedorMongo.js"
import { mailOptions, transporter } from '../middleware/nodemailer.js'

const controllerRegister = (req, res) => {
    res.render('registerTemplate.ejs')
}

const controllerRegisterSuccess = async (req, res) => {
    //Guardo los datos para nodemailer
    try {
        req.session.user = req.body.username
        req.session.firstName = req.body.firstName
        req.session.lastName = req.body.lastName
        req.session.userID = req.body.userID
        req.session.email = req.body.email
        req.session.phoneNumber = req.body.phoneNumber
        req.session.avatar = req.body.avatar

        const newCartID = await contenedorMongoCart.createDocument(req.session.userID)
        req.session.cartID = newCartID

        mailOptions.html = `<h1>Nuevo usuario registrado con los siguientes datos:</h1>
        <p>
            <ul style="color: blue">User: ${req.session.user}</ul>
            <ul style="color: blue">User Id: ${req.session.userID}</ul>
            <ul style="color: blue">First Name: ${req.session.firstName}</ul>
            <ul style="color: blue">Last Name: ${req.session.lastName}</ul>
            <ul style="color: blue">Email: ${req.session.email}</ul>
            <ul style="color: blue">Phone Number: ${req.session.phoneNumber}</ul>
        </p>`

        await transporter.sendMail(mailOptions)

        res.redirect('/login')
    } catch (error) {
        console.log(error)
    }
}

const controllerRegisterError = async (req, res) => {
    res.render('error.ejs')
}

export { controllerRegister, controllerRegisterSuccess, controllerRegisterError }