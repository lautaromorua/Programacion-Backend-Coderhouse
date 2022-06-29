const express = require('express')
const app = express();
const rutas = require('../routes/index');
const path = require('path');
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use('/', rutas);


app.listen(puerto, () =>{
    try {
        console.log(`Servidor escuchando el puerto ${puerto}`);
    } catch (error) {
        console.log(`Error al conectarse al servidor, error: ${error}`);
    }
});

