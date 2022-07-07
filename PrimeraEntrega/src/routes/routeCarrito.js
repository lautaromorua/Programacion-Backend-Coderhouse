const { Router } = require('express');
const router = Router();
const { agregarCarrito, getAll, eliminarPorId, buscarPorCarrito, agregarProductoACarrito, eliminarProdCarrito} = require('../controllers/controllerCarrito')

const isAdmin = (admin) =>{
    return ((req,res,next) =>{
        if(admin===true){
            next();
        } else {
            res.send('Acceso denegado')
        }
    })
}

router.get('/', isAdmin(true), (req,res)=>{
    getAll(res)
})

router.get('/:id/productos', isAdmin(true), (req,res)=>{
    buscarPorCarrito(req,res)
})

router.post('/', (req,res)=>{
    agregarCarrito(req.body, res)
})

router.post('/:id/productos', isAdmin(true), (req,res)=>{
    agregarProductoACarrito(req,res)
})

router.delete('/:id', isAdmin(true), (req,res)=>{
    eliminarPorId(req, res)
})

router.delete('/:id/productos/:id_prod', (req,res)=>{
    eliminarProdCarrito(req,res)
})

module.exports = router;