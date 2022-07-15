const Contenedor = require("../contenedor");
const productsDatabase = require('../db/database').connectionMysql;
const contenedorProductos = new Contenedor(productsDatabase, "productos");

const getAllP = async (res)=>{
    res.json(await contenedorProductos.getAll());
}

const getByIdP = async (req, res)=>{
    res.json(await contenedorProductos.getById(Number(req.params.id)));
}

const postProduct = async (req, res)=>{
    res.json(await contenedorProductos.save(req.body))
}

const putProduct = async (req, res)=>{
    res.json(await contenedorProductos.saveById(Number(req.params.id), req.body));
}

const deleteByIdP = async (req, res)=>{
    res.json(await contenedorProductos.deleteById(Number(req.params.id)));
}

module.exports = {contenedorProductos, getAllP, getByIdP, postProduct, putProduct, deleteByIdP}