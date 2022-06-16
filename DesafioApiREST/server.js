const express = require('express');
const app = express();
const rutas = require('./routes/index');
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', express.static(__dirname + '/public'));
app.use('/api/productos', rutas);


app.listen((error) =>{
    try {
        console.log(`Servidor escuchando el puerto ${PORT}`)
    } catch {
        console.log('Error al iniciar el servidor' + error);
    }
});

