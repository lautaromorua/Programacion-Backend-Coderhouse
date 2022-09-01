const controllerRegister = (req, res) => {
    let mensaje = 'Usuario creado';
    res.send({ ok: true, mensaje })
}

const controllerRegisterSuccess = async (req, res) => {
    req.session.user = req.body.username
    return await res.redirect('(api/login')
}

const controllerRegisterError = async (req, res) => {
    return await res.render('error.ejs')
}

export { controllerRegister, controllerRegisterSuccess, controllerRegisterError }