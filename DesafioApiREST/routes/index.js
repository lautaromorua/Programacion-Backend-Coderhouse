const { Router } =require('express');
const express = require('express');
const router = Router();
const carrito = require('../carrito.js');

const carritoProductos = new carrito('./carrito.txt');

carritoProductos.save({nombre: 'Arroz', precio: 2, foto: 'asdfr'});

router.get('/', (req,res)=>{
    try {
        res.json(carritoProductos.getProd())
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', (req,res)=>{
    try {
        const valor = req.params.id
    res.json(carritoProductos.getById(valor))
    } catch (error) {
        res.send(error);
    }
});

router.post('/', (req,res)=>{
    try {
        const objeto = req.body;
        res.json(carritoProductos.save(objeto))
    } catch (error) {
        res.send(error)
    }
});

router.put('/:id', (req,res)=>{
    try {
        const valor = req.params.id;
        const obj = req.body;
        res.json(carritoProductos.save(valor,obj));
    } catch (error) {
        res.send(error)
    }
})

router.delete('/id', (req,res)=>{
    try {
        const valor = req.params.id;
        res.json(carritoProductos.deleteProd(valor))
    } catch (error) {
        res.send(error);
    }
});



module.exports = router;