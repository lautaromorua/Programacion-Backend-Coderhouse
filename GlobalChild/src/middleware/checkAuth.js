const checkAdmin = async (req, res, next) => {
    if (!req.session.user) {
        console.log("Un usuario trato de navegar sin logearse")
        return await res.redirect("/login")
    } else {
        console.log(`Ingreso el usuario ${req.session.user}`)
        return next()
    }
}

export { checkAdmin };