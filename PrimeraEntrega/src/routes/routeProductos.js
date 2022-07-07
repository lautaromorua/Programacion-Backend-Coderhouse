const { Router } = require('express');
const router = Router();
const { getAll, getById, agregarProducto, actualizarProducto, eliminarProductoId} = require('../controllers/controllerProductos')

const isAdmin = (admin) =>{
    return ((req,res,next)=>{
        if(admin===true){
            next();
        }else {
            res.send('Acceso denegado')
        }
    })
}

router.get('/:id?', (req,res)=>{
    const { id } = req.params;
    if(!id){
        getAll(res)
    }else {
        getById(req.params.id, res)
    }
})

router.post('/', isAdmin(true), (req,res)=>{
    agregarProducto(req.body, res)
})

router.put('/:id', isAdmin(true), (req,res)=>{
    actualizarProducto(req,res)
})

router.delete('/:id', isAdmin(true), (req,res)=>{
    eliminarProductoId(req,res)
})

module.exports = router;