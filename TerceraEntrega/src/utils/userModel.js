import UserContainer from '../daos/userDao.js'

const User = new UserContainer("usuarios",
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        avatar: { type: String, required: true }
    });

export default User;
