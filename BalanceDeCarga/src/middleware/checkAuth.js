const checkAdmin = (req, res, next) => {
    req.body.admin = true;
    if (req.body.admin) {
        next();
    } else {
        res.status(403).send({
            error: -1,
            descripcion: `Ruta ${req.url} con método ${req.method} no autorizada`,
        });
    }
}

export default checkAdmin;