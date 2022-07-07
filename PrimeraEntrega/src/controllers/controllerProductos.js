const Contenedor = require("../contenedorGeneral");
const productos = new Contenedor("ProductosDB", "ProductosIDs");

const getAll = async (res) => {
    res.send(await productos.getAll())
    
}

const getById = async (id, res)=>{
    return res.send(await productos.getById(id))
}

const agregarProducto = async (producto, res) => {
    await productos.save(producto, res)
    
}

const actualizarProducto = async (req, res) => {
    await productos.actualizarProducto(req.body, req.params.id, res)
    
}

const eliminarProductoId = async (req, res) => {
    await productos.eliminarProductoId(req.params.id, res)
}

module.exports = {getAll, getById, agregarProducto, actualizarProducto, eliminarProductoId}