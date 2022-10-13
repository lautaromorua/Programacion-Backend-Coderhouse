import mongoose from "mongoose";

const schemaCart = new mongoose.Schema({
    user: { type: String },
    productos: [
        {
            productID: { type: mongoose.Schema.Types.ObjectId, ref: 'productos' },
            quantity: { type: Number }
        }
    ]
})

const Cart = mongoose.model('carritos', schemaCart)

export { Cart }
