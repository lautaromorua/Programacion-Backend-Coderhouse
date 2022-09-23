import express from 'express';
import path from 'path';
import MongoStore from 'connect-mongo'
import { fileURLToPath } from "url";
import session from 'express-session'
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { claves } from './config.js'
import routes from './routes/index.js'
import yargs from 'yargs'
import os from 'os'
import compression from 'compression';
import cluster from 'cluster';
import { argv } from 'process';
import { hashPassword, isValidPassword } from './utils/services.js'
import { Strategy as LocalStrategy } from 'passport-local'
import User from './utils/userModel.js'

const yargOptions = yargs(process.argv.slice(2))
const args = yargOptions.alias({
    p: 'port'
}).default({
    port: 3000,
    mode: 'fork'
}).argv

const app = express();
const PORT = args.port

if (argv.mode === 'cluster' && cluster.isPrimary) {
    os.cpus().map(() => {
        cluster.fork();
    });

    cluster.on('exit', worker => {
        console.log(`Worker ${worker.process.pid} died.`)
        cluster.fork()
    });
} else {

    app.use(compression())

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    await mongoose.connect(claves.connectionStringMongo).then(console.log('Conexion establecida con mongo'));

    //configuracion para acceder al body
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    //rutas estaticas - public
    app.use(express.static(path.join(__dirname, '../views')));
    app.use(express.static("uploads"))

    app.set('views', path.join(__dirname, '../views'))
    app.set('view engine', 'ejs')

    const mongoStoreOptions = { useNewUrlParser: true, useUnifiedTopology: true }
    app.use(cookieParser())

    app.use(
        session({
            store: MongoStore.create({
                mongoUrl: claves.connectionStringMongo,
                mongoStoreOptions
            }),
            secret: claves.sessionSecret,
            resave: false,
            saveUninitialized: false,
            rolling: true,  //Hace que renueve el tiempo de expiracion de la sesion en cada request
            cookie: {
                maxAge: 6000,
                httpOnly: false,
                secure: false
            },
        })
    );

    app.use(passport.initialize())
    app.use(passport.session())

    const registerStrategy = new LocalStrategy(
        { passReqToCallback: true },
        async (req, email, password, done) => {

            const { username } = req.body
            try {
                const existingUser = await User.getByUsername(username)
                const existingMail = await User.getByEmail(email)

                if (!existingUser) {
                    console.log('dentrodelif')
                    return done(null, { error: true, message: 'Usuario existente' })
                } else if (!existingMail) {
                    return done(null, { error: true, message: 'Email existente' })
                }

                const newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hashPassword(password)
                }
                User.save(newUser);

                return done(null, null, { status: 'ok', message: 'Usuario registrado' })
            } catch (error) {
                console.log('Error al registrar usuario', error)
                done(null, newUser, { error: true, message: 'Error en registro' })
            }
        }
    )

    const loginStrategy = new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await User.getByUsername(username)
                if (!user || !isValidPassword(password, user.password)) {
                    return done(null, { error: true, message: 'Credenciales invalidas' })
                }


                return done(null, user, { status: 'Ok' })
            } catch (error) {
                console.log("Error al loguear", error)
                return done(null, null)
            }
        });

    passport.use('register', registerStrategy)
    passport.use('login', loginStrategy)

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser((id, done) => {
        User.collection.findById(id, done).clone().then(user => {
            done(null, user)
        }).catch(err => {
            done(err, null)
        })
    })

    app.use('/', routes);

    app.listen(PORT, (error) => {
        try {
            console.log(`El servidor está escuchando el puerto 3000`)
        } catch {
            console.log(`Error al iniciar el server`, error);
        }
    });

}

