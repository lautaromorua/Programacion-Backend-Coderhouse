const controllerLogin = async (req, res) => {
    try {
        res.render('cerrarSesion.ejs', { username })
        req.session.username = req.body.username;
        res.json(req.session.username)
    } catch (error) {
        console.log('Usuarion no logueado')
        res.redirect('/login')
    }
}

const controllerLogout = (req, res) => {
    try {
        req.session.destroy()
        return res.render('cerrarSesion.ejs')
    } catch (error) {
        console.log('Ocurrio un error al cerrar la sesion', error)
    }
}

const controllerLoginSucces = async (req, res) => {
    req.session.user = req.body.username
    await res.redirect('/login')
}

const controllerLoginError = async (req, res) => {
    await res.render('/errorLogin.ejs')
}

export { controllerLogin, controllerLogout, controllerLoginSucces, controllerLoginError };