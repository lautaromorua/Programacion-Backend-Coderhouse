import mongoose from "mongoose";

const schemaCart = new mongoose.Schema({
    user_id: { type: String },
    products: { type: Array },
})

const Cart = mongoose.model('carritos', schemaCart)

export { Cart } 