import { Router } from 'express';
import infoRoute from './infoRoute.js'
import randomRoute from './randomRoute.js'
import loginRoute from './loginRoute.js'
import registerRoute from './registerRoute.js'
const router = Router();

// router.get('/home', (req, res) => {
//     try {
//         res.send('Estas en home')
//     } catch (error) {
//         console.log('Error', error)
//         res.sendStatus(500).send('Error de servidor')
//     }
// });

router.use('/info', infoRoute)
router.use('/randoms', randomRoute)

router.use('/login', loginRoute)
router.use('/register', registerRoute)

export default router;
