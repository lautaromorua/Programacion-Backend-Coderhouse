
const registerController = async(req, res) =>{
    
    res.render('plantillaRegister.ejs')
}

const registerPostController = async(req, res) =>{
    req.session.user = req.body.username    

    res.redirect("/api/login")
}

const registerErrorController = async(req, res) =>{
    res.render('plantillaRegisterError')
}

export { registerController, registerPostController, registerErrorController }