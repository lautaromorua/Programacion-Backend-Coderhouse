import { Strategy as LocalStrategy } from 'passport-local'
import { userDao } from './daos/userDao.js'
import { hashPassword, isValidPassword } from './utils/services.js'
import passport from 'passport'

const registerStrategy = new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    try {
        console.log('estrategia')
        const existingUser = await userDao.findByUsername({ username })
        if (existingUser) {
            return done(null, { error: true, message: 'Usuario existente' })
        }

        const newUser = {
            username,
            password: hashPassword(password),
            email: req.body.email
        }

        const createUser = await userDao.createDocument(newUser)
        return done(null, createUser, { status: 'Ok', message: 'Usuario registrado exitosamente' })

    } catch (error) {
        console.log('Error al registrar usuario', error)
        done(null, newUser, { error: true, message: 'Error en registro' })
    }
}
)

const loginStrategy = new LocalStrategy(async (req, username, password, done) => {
    try {
        const user = await userDao.findByUsername({ username })
        if (!user || !isValidPassword(password, user.password)) {
            return done(null, null, { error: true, message: 'Credenciales invalidas' })
        }

        //req.session.user = { username: user.username, email: user.email }
        done(null, user, { status: 'Ok' })
    } catch (error) {
        console.log("Error al loguear", error)
        done(null, null, { error: true, message: 'Error al loguearse' })
    }
});

passport.use('register', registerStrategy)
passport.use('login', loginStrategy)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    userDao.getById(id, done)
})

export {
    registerStrategy,
    loginStrategy
}