import { Strategy as LocalStrategy } from 'passport-local'
import { userDao } from './daos/userDao.js'
import { hashPassword, isValidPassword } from './utils/services.js'
import express from "express"
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const registerStrategy = new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    try {
        const existingUser = await userDao.findByUsername({ username })
        if (existingUser) {
            return done(null, { error: true, message: 'Usuario existente' })
        }

        const newUser = {
            username,
            email: req.body.email,
            password: hashPassword(password)
        }

        const createUser = await userDao.createDocument(newUser)
        return done(null, createUser, { status: 'Ok', message: 'Usuario registrado exitosamente' })

    } catch (error) {
        console.log('Error al registrar usuario', error)
        done(null, newUser, { error: true, message: 'Error en registro' })
    }
}
)

const loginStrategy = new LocalStrategy(async (username, password, done) => {
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

export {
    registerStrategy,
    loginStrategy
}