const Contenedor = require("../contenedorGeneral");
const carrito = new Contenedor("CarritoDB", "CarritoIDs");

const agregarCarrito = async (cart, res) => {
    try {
        await carrito.agregarCarrito(cart, res);
    } catch (e) {
    console.log("Error:", e);
}
};

const getAll = async (res) => {
try {
    res.send(await carrito.getAll());
} catch (e) {
    console.log("Error:", e);
}
};

const eliminarPorId = async (req, res) => {
try {
    await carrito.eliminarPorId(req.params.id, res);
} catch (e) {
    console.log("Error:", e);
}
};

const buscarPorCarrito = async (req, res) => {
try {
    await carrito.buscarPorCarrito(req.params.id, res);
    } catch (e) {
        console.log("Error:", e);
    }
};

const agregarProductoACarrito = async (req, res) => {
try {
    await carrito.agregarProductoACarrito(req.params.id, req.body.id, res);
} catch (e) {
    console.log("Error:", e);
}
};

const eliminarProdCarrito = async (req, res) => {
try {
    await carrito.eliminarProdCarrito(req.params.id, req.params.id_prod, res);
} catch (e) {
    console.log("Error:", e);
}
};

module.exports = {
    agregarCarrito,
    getAll,
    eliminarPorId,
    buscarPorCarrito,
    agregarProductoACarrito,
    eliminarProdCarrito,
};