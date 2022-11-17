const controllerLogout = (req, res) => {
    req.session.destroy()
    res.render('cerrarSesion.ejs', { data: req.user })
}

const controllerLoginError = async (req, res) => {
    await res.render('errorLogin.ejs')
}

export default { controllerLoginError, controllerLogout }