import mongoose from "mongoose";

const schemaProd = new mongoose.Schema({
    timestamp: { type: Date, },
    nombre: { type: String, },
    descripcion: { type: String, },
    codigo: { type: Number, },
    url: { type: String, },
    precio: { type: Number, },
    stock: { type: Number, },
})

const Productos = mongoose.model('productos', schemaProd)

export { Productos }
