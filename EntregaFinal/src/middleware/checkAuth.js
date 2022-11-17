import User from '../models/user.model.js'

export const auth = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.render('error', { message: 'No estas autorizado' })
    }
}

export const checkAdmin = async (req, res, next) => {
    const user = await User.findOne({ _id: req.session?.passport?.user })
    if (user?.admin) {
        return next();
    } else {
        res.redirect('/login')
    }
}

export const isLogged = (req, res, next) => {
    if (req.session.passport) {
        next();
    } else {
        res.render('error', { data: ' No estas logeado' })
    }
}