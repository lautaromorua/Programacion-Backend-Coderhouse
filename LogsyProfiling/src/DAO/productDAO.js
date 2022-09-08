import { Product } from "../models/productsModel.js"

const productDAO = {

    async getById(id) {
        const doc = await Product.find( { _id: id } )
        return doc
    },

    async getAll(){
        const doc = await Product.find({})
        return doc
    },

    async createDocument(document){
        const doc = await Product.insertMany(document)
        return doc[0]._id
    },

    async updateDocument(id, paramsToUpdate){
        const doc = await Product.updateOne({ _id: id }, {$set: paramsToUpdate})
        return "Documento actualizado en la base :)"
    },

    async deleteById(id){
        const doc = await Product.deleteOne({ _id: id })
        return "Documento eliminado de la base :)"
    }

}

export { productDAO }