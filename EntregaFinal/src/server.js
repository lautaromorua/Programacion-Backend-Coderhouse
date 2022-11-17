import express from 'express';
import path from 'path';
import MongoStore from 'connect-mongo';
import { fileURLToPath } from "url";
import session from 'express-session'
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { claves } from './config/config.js'
import routes from './routes/index.js'
import compression from 'compression';
import { upload } from './middleware/multerMidd.js';
import Users from './models/user.model.js';
import { registerStrategy, loginStrategy } from './utils/estrategies.js'
import socket from './public/chat.socket.js'
import 'dotenv/config';


const app = express();

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

app.use("/", express.static(__dirname + "/public"));
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

const mongoStoreOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(cookieParser())

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: claves.connectionStringMongo,
            mongoStoreOptions,
        }),
        secret: claves.sessionSecret,
        resave: false,
        saveUninitialized: false,
        rolling: true,  //Hace que renueve el tiempo de expiracion de la sesion en cada request
        cookie: {
            maxAge: 6000,
        },
    })
);

//Registro
app.post('/register', upload.single('avatar'), await passport.authenticate('register', { failureRedirect: '/registerError', }),
    (req, res) => res.redirect('/'))

//Logueo
app.post('/login', passport.authenticate('login', { failureRedirect: '/loginError', failureMessage: true }),
    (req, res) => res.redirect('/'))

app.use(passport.initialize())
app.use(passport.session())

passport.use('register', registerStrategy)
passport.use('login', loginStrategy)

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser((id, done) => {
    Users.findById(id, done)
});

app.use('/', routes);


const expressServer = app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando el puerto ${process.env.PORT}`)
});

socket(expressServer);
