const express = require('express');
const app = express();
const routeProducto = require('./routes/routeProductos')
const routeCarrito = require('./routes/routeCarrito')
const dotenv = require('dotenv');
const PORT =process.env.PORT || 8080;
dotenv.config();



app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/api/productos', routeProducto)
app.use('/api/carritos', routeCarrito)

app.listen(PORT, ()=>{
    try {
        console.log(`Servidor escuchando el puerto ${PORT}`)
    } catch (error) {
        console.log(`Error al iniciar el servidor, ${error}`)
    }
})