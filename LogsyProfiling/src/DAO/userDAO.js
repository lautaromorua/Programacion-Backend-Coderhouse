import { User } from "../models/userModel.js"

const userDAO = {

    async getById(id) {
        const doc = await User.find( { _id: id } )
        return doc
    },

    async findOne(username) {
        const doc = await User.findOne({ username })
        return doc
    },

    async getAll(){
        const doc = await User.find({})
        return doc
    },

    async createDocument(document){
        const doc = await User.insertMany(document)
        return doc[0]._id
    },

    async updateDocument(email, paramsToUpdate){
        const doc = await User.updateOne({ email: email  }, {$set: paramsToUpdate})
        return "Documento actualizado en la base :)"
    },

    async deleteUserByEmail(email){
        const doc = await User.deleteOne({ email: email })
        return "Usuario eliminado de la base :)"
    }

}

export { userDAO }