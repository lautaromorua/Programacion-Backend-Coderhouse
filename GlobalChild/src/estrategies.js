import { Strategy as LocalStrategy } from 'passport-local'
import { hashPassword, isValidPassword } from './utils/services.js'
import { User } from './utils/userModel.js'

const registerStrategy = new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return done(null, null, { error: true, message: 'Usuario existente' })
        }

        const newUser = {
            username,
            password: hashPassword(password),
            email: req.body.email
        }

        const createUser = await User.create(newUser)
        return done(null, null, createUser, { status: 'Ok', message: 'Usuario registrado exitosamente' })

    } catch (error) {
        console.log('Error al registrar usuario', error)
        done(null, newUser, { error: true, message: 'Error en registro' })
    }
}
)

const loginStrategy = new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    try {
        const user = await User.find({ username })
        if (!user || !isValidPassword(password, user.password)) {
            return done(null, null, { error: true, message: 'Credenciandles invalidas' })
        }

        req.session.user = { username: user.username, email: user.email }
        done(null, user, { status: 'Ok' })
    } catch (error) {
        console.log("Error al loguear", error)
        done(null, null, { error: true, message: 'Error al loguearse' })
    }
});

export {
    registerStrategy,
    loginStrategy
}