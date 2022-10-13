import { contenedorMongoCart, contenedorMongoProd } from '../containers/contenedorMongo.js';
import logger from '../utils/logger.js';

const getCartProducts = async (req, res) => {
    try {
        const cartID = req.params.id
        const response = await contenedorMongoCart.getById(cartID);
        res.send(response)
    } catch (e) {
        logger.error("Ocurrio un error al obtener los productos del carrito:", e);
        res.sendStatus(500)
    }
};

const addProductACart = async (req, res) => {
    try {
        const cartID = req.params.cart_id
        const productID = req.params.product_id

        const cartCheck = await contenedorMongoCart.getById(cartID)

        const existingProdInCart = cartCheck.productos.find(product => product.productID === product.productID)

        if (existingProdInCart) {
            existingProdInCart.quantity += 1
        } else {
            cartCheck.productos.push({
                productID: productID,
                quantity: 1
            })
        }

        await contenedorMongoCart.updateDocument(cartID, cartCheck);
        console.log(`Producto ${productID} agregado`)

    } catch (e) {
        logger.error('Ocurrio un error al agregar el producto al carrito', e);
        res.sendStatus(500)
    }
};

const getUserCartController = async (req, res) => {
    try {
        const { productos } = await contenedorMongoCart.getByUserId(req.session.userID)

        const productsPromises = await productos.map(async (product) => {
            const productData = await contenedorMongoProd.getById(product.productID)
            return {
                productID: productData._id,
                nombre: productData.nombre,
                thumbnail: productData.thumbnail,
                precio: productData.precio,
                cantidad: product.cantidad,
                total: productData.price * product.cantidad
            }
        })

        const productsInCart = await Promise.all(productsPromises)
        req.session.productsInCart = productsInCart

        res.render('templateCarts.ejs', { productsInCart })
    } catch (error) {
        console.log(error)
    }
}

const getNewCart = async (req, res) => {
    try {
        const response = await contenedorMongoCart.createDocument();
        res.send(`Carrito Creado con el ID ${response._id}`)
    } catch (e) {
        logger.error('Ocurrio un error al crear el carrito', e);
        res.sendStatus(500)
    }
};

const updateProductCart = async (req, res) => {
    try {
        const cartID = req.params.id
        const productUpdate = req.body

        const cartResponse = await cartDAO.updateDocument(cartID, productUpdate)

        res.send(cartResponse)

    } catch (error) {
        logger.error(error)
    }
}


const deleteCart = async (req, res) => {
    try {
        const cartID = req.params.id
        const response = await contenedorMongoCart.deleteById(cartID);
        if (!response) {
            res.send("El id de carrito no existe");
        } else {
            res.send(response);
        }
    } catch (error) {
        logger.error("Ocurrio un error al querer eliminar el carrito", error);
        res.sendStatus(500);
    }
};

const deleteById = async (req, res) => {
    try {
        const cartID = req.params.id
        const productID = req.params.id_prod
        const response = await contenedorMongoCart.deleteProductInCart(cartID, productID);
        res.send(response)
    } catch (e) {
        logger.error('Ocurrio un error al eliminar el producto  del carrito', e);
        res.sendStatus(500)
    }
};

const cartControllerPurchase = async (req, res) => {
    try {
        //Email
        mailOptions.subject = `Nuevo pedido de ${req.session.user} (email: ${req.session.email})`
        mailOptions.html = `<h1>Nuevo pedido de ${req.session.user} (email: ${req.session.email})</h1>
        <h2>Productos comprados:</h2>
        `

        req.session.productsInCart.forEach(product => {
            mailOptions.html += (`
            <br>
            <ul>Nombre: ${product.nombre}</ul>
            <ul>productID: ${product.productID}</ul>
            <ul>Precio: ${product.precio}</ul>
            <ul>Cantidad: ${product.cantidad}</ul>
            <ul>Total: ${product.total}</ul>
            <br>
            `)
        })

        await transporter.sendMail(mailOptions)


        // Whatsapp
        option.body = `
        Nuevo pedido de ${req.session.user} (email: ${req.session.email})
        Productos comprados:
        `
        req.session.productsInCart.forEach(product => {
            option.body += (`
            Nombre: ${product.nombre}
            productID: ${product.productID}
            Precio: ${product.precio}
            Cantidad: ${product.cantidad}
            Total: ${product.total}
            `)
        })

        console.log(option)
        const message = await client.messages.create(option)
        console.log(message)

        req.session.productsInCart = []
        const cartID = req.session.cartID
        //obtenemos el carrito que debemos vaciar
        const cartToUpdate = await contenedorMongoCart.getById(cartID)

        //Le asginamos un array vacio al array de productos del carrito a vaciar
        cartToUpdate.productos = req.session.productsInCart

        //finalmente lo cargamos en la base
        await contenedorMongoCart.updateDocument(cartID, cartToUpdate)

        res.redirect("/login")
    } catch (error) {
        console.log(error)
    }
}


export {
    getNewCart,
    getCartProducts,
    deleteCart,
    addProductACart,
    deleteById,
    getUserCartController,
    updateProductCart,
    cartControllerPurchase
};