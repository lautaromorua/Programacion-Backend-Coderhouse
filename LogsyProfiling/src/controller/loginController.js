
const loginController = async (req, res) => {
    if(req.isAuthenticated()){
        console.log("user ya logeado")
        res.redirect("/api/products/all")
    } else { 
        console.log("user no logeado, por favor ingrese credenciales")
        res.render("plantillaLogin.ejs")
    }
    
}

const loginPostController = async (req, res) => {
    req.session.user = req.body.username
    

    res.redirect("/api/products/all")
}

const logOutController = async (req, res) => {
    req.session.destroy()

    res.render("plantillaDeslogeo.ejs")
}

const loginErrorController = async (req, res) => {
    res.render('plantillaLoginError')
}

export { loginController, loginPostController, logOutController, loginErrorController }