import bcryp from 'bcrypt'

//const createHash = (pass) => bcryp.hashSync(pass.toString(), bcryp.genSaltSync(10))

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