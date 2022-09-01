import bcryp from 'bcrypt'

const hashPassword = (password) => {
    return bcryp.hashSync(password, bcryp.genSaltSync(10));
}

const isValidPassword = (plainPassword, hashedPass) => {
    return bcryp.compareSync(plainPassword, hashedPass)
}

export {
    hashPassword,
    isValidPassword
}