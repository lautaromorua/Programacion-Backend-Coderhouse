import mongoose from "mongoose";

const schemaProd = new mongoose.Schema({
    timestamp: { type: Date, },
    name: { type: String, },
    description: { type: String, },
    code: { type: Number, },
    url: { type: String, },
    price: { type: Number, },
    stock: { type: Number, },
})

const Products = mongoose.model('productos', schemaProd)

export { Products }
