import { User } from '../userModel.js'

const userDao = {
    async getById(id) {
        const doc = await User.find({ _id: id })
        return doc
    },

    async findByUsername(username) {
        const doc = await User.findOne({ username })
        return doc;
    },

    async getAll() {
        const doc = await User.find({})
        return doc;
    },

    async createDocument(object) {
        const doc = await User.createDocument(object)
        return doc[0]._id;
    }
}

export { userDao }