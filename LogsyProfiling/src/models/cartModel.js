import mongoose from "mongoose"


const cartSchema = new mongoose.Schema({
    products: [
        {
        productId:{type: mongoose.Schema.Types.ObjectId, ref: "products"},
        quantity: { type: Number }
        }
    ]
})

const Cart = mongoose.model('carts', cartSchema)

export { Cart }