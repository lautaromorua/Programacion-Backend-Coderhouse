const controllerLogin = async (req, res) => {
    if (req.isAuthenticated()) {
        console.log('El usuario ya esta logeado')
        return await res.redirect('/login')
    } else {
        console.log('You dont have permission for visit this page')
        return await res.render('welcomeLogin.ejs')
    }
}

const controllerLogout = async (req, res) => {
    req.session.destroy()
    return await res.render('cerrarSesion.ejs')
}

const controllerLoginSucces = async (req, res) => {
    req.session.user = req.body.usename
    return await res.redirect('/login')
}

const controllerLoginError = async (req, res) => {
    return await res.render('errorLogin.ejs')
}

export { controllerLogin, controllerLogout, controllerLoginSucces, controllerLoginError };