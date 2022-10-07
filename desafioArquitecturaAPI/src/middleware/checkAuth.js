const checkAdmin = (req, res, next) => {
    if (!req.session.user) {
        console.log('No tiene permiso para visitar esta pagina')
        res.redirect('/login')
    } else {
        console.log(`Ingreso en usuario ${req.session.user}`)
        return next()
    }
}

export default checkAdmin;