import express from 'express';
import path from 'path';
import MongoStore from 'connect-mongo'
import { fileURLToPath } from "url";
import session from 'express-session'
import passport from 'passport';
import { User } from './utils/userModel.js'
import { registerStrategy, loginStrategy } from './estrategies.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { claves } from './config.js'
import routes from './routes/index.js'
import yargs from 'yargs'

const yargOptions = yargs(process.argv.slice(2))

const args = yargOptions.alias({
    p: 'port'
}).default({
    port: 3000
}).argv

const app = express();
const PORT = args.port

await mongoose.connect(claves.connectionStringMongo).then(() => {
    console.log('Conexion establecida con mongo')
})

app.listen(PORT, (error) => {
    try {
        console.log(`El servidor está escuchando el puerto 3000`)
    } catch {
        console.log(`Error al iniciar el server`, error);
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.set('views', path.join(__dirname, '../public'))
app.set('view engine', 'ejs')

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

passport.use('register', registerStrategy)
passport.use('login', loginStrategy)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, done)
})

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


//import http from 'http';
//import { Server } from 'socket.io';
//import cors from 'cors';
/*app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
}); */

// app.use('/*', (req, res) => {
    //     res.sendStatus(404).send('Ruta no implementada');
    // })

/*import databaseChat from './db/database.js'
import chatContainer from './chat.js'
import Contenedor from './contenedor.js';
const chat = new chatContainer(databaseChat.connectionSQLite, 'chats')


io.on('connection', async socket => {
    
    console.log('Se conectó el cliente con id: ', socket.id);
    
    socket.emit('server:products', await Contenedor.getAll());
    
    socket.on('client:product', async productoInfo => {
        contenedorProductos.save(productoInfo)
        io.emit('server:products', producto);
    })
    
    socket.emit('server:messeges', await chat.getAll());
    
    socket.on('client:message', async msgInfo => {
        chat.save(msgInfo);
        io.emit('server:messeges', await chat.getAll());
        
        console.log(`el cliente ${socket.id} envió un mensaje`)
})
}); */
