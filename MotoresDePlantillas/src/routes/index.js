const { Router } = require('express');
const router = Router();
const { home, products, postProducts } = require('../controllers/controllerRoutes')

router.get('/', home);
router.get('/productos', products)
router.post('/', postProducts);



module.exports = router;