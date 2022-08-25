const controllerRegister = async (req, res) => {
    return await res.render('register.ejs')
}

const controllerRegisterSuccess = async (req, res) => {
    req.session.user = req.body.username

    return await res.redirect('/login')
}

const controllerRegisterError = async (req, res) => {
    return await res.render('error.ejs')
}

export { controllerRegister, controllerRegisterSuccess, controllerRegisterError }