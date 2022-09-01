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

//import { userDao } from './daos/userDao.js';

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
    console.log('despues')

    //rutas estaticas - public
    app.use(express.static(path.join(__dirname, '../views')));
    app.set('views', path.join(__dirname, '../views'))
    app.set('view engine', 'ejs')

    //configuracion para acceder al body
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const mongoStoreOptions = { useNewUrlParser: true, useUnifiedTopology: true }
    app.use(cookieParser())

    app.use(session({
        store: MongoStore.create({
            mongoUrl: claves.connectionStringMongo,
            mongoStoreOptions
        }),
        secret: claves.sessionSecret,
        resave: false,
        saveUninitialized: false,
        rolling: true,  //Hace que renueve el tiempo de expiracion de la sesion en cada request
        cookie: { maxAge: 6000 },
    })
    );

    app.use('/api', routes);

    app.use(passport.initialize())
    app.use(passport.session())

    app.listen(PORT, (error) => {
        try {
            console.log(`El servidor está escuchando el puerto 3000`)
        } catch {
            console.log(`Error al iniciar el server`, error);
        }
    });
}

// app.get('/', (req, res) => {
    //     if (req.user) {
        //         res.render('index', { data: req.user.userName })
        //     } else {
            //         res.render('index', { data: undefined })
//         console.log('data:undefined', req.session.user);
//     }
// });

// app.post('/login', passport.authenticate('login', { failureRedirect: '/errorLogin', failureMessage: true }), (req, res) => res.redirect('/'))

// app.post('/login', (req, res) => {
//     const { username, password } = req.body
//     const user = users.find(user => user.username === username)
//     if (!user || password !== user.password) {
//         return res.render({ error: true, message: 'Credenciales no validas' })
//     }

//     req.session.user = user
//     res.render('/index', { data: user.username })
// })

// app.get('/logout', checkAuth(admin), (req, res) => {
//     let user = req.session.user
//     req.session.destroy()
//     res.render('cerrarSesion', { data: user })
// })

// app.get('/register', (req, res) => {
//     res.render('/register')
// });

// app.post('/register', await passport.authenticate('register', { failureRedirect: '/error' }), (req, res) => {
//     const username = req.body
//     const existingUser = users.find(user => user.username === username)
//     if (existingUser) {
//         return res.render('error', { data: 'Username already in use' })
//     }
//     User.save(req.body)
//     console.log(users)
//     res.redirect('/')
// })


// app.get('/error', (req, res) => {
//     res.render('error', { data: 'error' })
// })

// app.get('/errorLogin', (req, res) => {
//     res.render('errorLogin')
// })

// app.get('*', (req, res) => {
//     res.render('error', { data: 'Error 404 not found' })
// })

