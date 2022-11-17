import bcryp from 'bcrypt'

function hashPassword(password) {
    return bcryp.hashSync(password.toString(), bcryp.genSaltSync(10));
}

function isValidPassword(plainPassword, hashedPass) {
    return bcryp.compareSync(plainPassword, hashedPass)
}

export {
    hashPassword,
    isValidPassword
}