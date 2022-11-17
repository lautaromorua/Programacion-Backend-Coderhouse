import mongoose from "mongoose";

const schemaUsers = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean }
});

const Users = mongoose.model('Usuarios', schemaUsers);

export default Users;
