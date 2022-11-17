import mongoose from "mongoose";

const schemaTicket = new mongoose.Schema({
    nro: Number,
    user: String,
    products: Array,
})

const Ticket = mongoose.model('Tickets', schemaTicket)

export { Ticket }