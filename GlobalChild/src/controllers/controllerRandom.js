import { fork } from 'child_process';

const randoms = async (req, res) => {
    const calculo = fork('./utils/random.js')

    let cant = req.query.cant
    if (NaN(cant)) {
        cant = 50000000
    }

    calculo.on('message', msg => {
        if (msg === 'Ready') {
            calculo.send(cant)
        } else {
            res.send(msg)
        }
    })
}

export default { randoms }