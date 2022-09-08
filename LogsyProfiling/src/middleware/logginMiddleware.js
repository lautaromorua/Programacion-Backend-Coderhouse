const logginMiddleware = (req, res, next) => {
    if(!req.session.user) {
        console.log("Un usuario trato de navegar sin logearse")
        res.redirect("/api/login")
    } else {
        console.log(`Ingreso el usuario ${req.session.user}`)
        return next()
    }
}

export { logginMiddleware }