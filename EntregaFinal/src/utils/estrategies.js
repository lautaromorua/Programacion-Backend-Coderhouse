import { Strategy as LocalStrategy } from 'passport-local'
import { hashPassword, isValidPassword } from '../services.js'
import Users from '../models/user.model.js'

const registerStrategy = new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    try {

        const existingUser = await Users.findOne({ username })

        if (existingUser) {
            return done(null, { error: true, message: 'Usuario existente' })
        }

        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashPassword(password)
        }

        const createUser = await Users.create(newUser)

        return done(null, createUser, { status: 'Ok', message: 'Usuario registrado exitosamente' })
    } catch (error) {
        console.log('Error al registrar usuario', error)
        done(null, newUser, { error: true, message: 'Error en registro' })
    }
}
)

const loginStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const user = await Users.findOne({ username })
        if (!user || !isValidPassword(password, user.password)) {
            return done(null, null, { error: true, message: 'Credenciales invalidas' })
        }

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