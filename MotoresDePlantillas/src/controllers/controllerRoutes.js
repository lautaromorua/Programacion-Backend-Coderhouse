const productos = [];

const home = (req,res) =>{
    try {
        res.render('home.hbs')
    } catch (error) {
        console.log(`Error al cargar la ruta, ${error}`)
        res.status(404)
    };
};

const products = (req,res, next) =>{
    res.render('productos.hbs', { productos })
};

const postProducts = (req,res, next)=>{
    productos.push(req.body)
    res.redirect('/')
    res.status(201).render
};

const productsAll = (req,res,next)=>{
    try {
        return res.send(productos);
    } catch (error) {
        res.status(404).res.json({ error: error.mensaje})
    }
};

module.exports = {
    home, products, postProducts, productsAll
};

