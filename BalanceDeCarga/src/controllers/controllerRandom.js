import { fork } from 'child_process';

const randoms = async (req, res) => {
    try {
        let cant = req.query.cant
        if (cant) {
            cant = 50000000
        }

        const calculo = fork('./utils/random.js')
        calculo.on('message', msg => {
            if (msg === 'Ready') {
                calculo.send(cant)
            } else {
                res.send(msg)
            }
        })

    } catch (error) {
        console.log('Ocurrio un error', error)
    }
}

export { randoms } 