const fs = require('fs');

class Contenedor {
    constructor(database, IDdb){
        this.database = database;
        this.IDdb = IDdb;
    }

    async save(objeto, res){
        let data = JSON.parse(await fs.promises.readFile(`./src/${this.database}.txt`, 'utf-8'));

        try {
            if(!data){
                let id = JSON.parse(await fs.promises.readFile(`./src/${this.IDdb}.txt`, 'utf-8'));
                let maxID = Math.max(...id);
                objeto.id = maxID + 1;
                id = [...id, objeto.id];
                await fs.promises.writeFile(`./src/${this.IDdb}.txt`, JSON.stringify(id));
                await fs.promises.writeFile(`./src/${this.database}.txt`, JSON.stringify(objeto));
            } else {
                let id = JSON.parse(await fs.promises.readFile(`./src/${this.IDdb}.txt`, 'utf-8'));
                let maxID = Math.max(...id);
                objeto.id = maxID + 1;
                id = [...id, objeto.id];
                await fs.promises.writeFile(`./src/${this.IDdb}.txt`, JSON.stringify(id));
                let productos = JSON.parse(await fs.promises.readFile(`./src/${this.database}.txt`, 'utf-8'))
                productos.push(objeto)
                await fs.promises.writeFile(`./src/${this.database}.txt`, JSON.stringify(productos));

                res.send('Producto agregado')
            }
        } catch (error) {
            console.log('Error al guardar' + error)
        }
    }

    async getById(id){
        let data = JSON.parse(
            await fs.promises.readFile(`./src/${this.database}.txt`, "utf-8")
        );
    
        try {
            let objeto = data.find((prod) => prod.id == id);
            let resultado = objeto ? objeto : { error: "No existe" };
            return resultado;
        } catch (error) {
            console.log('Error al obtener producto', error);
        }
    }
    
    async getAll() {
        try {
            let data = JSON.parse(await fs.promises.readFile(`./src/${this.database}.txt`,"utf-8"));
            return data;
        } catch (error) {
        console.log("Error al obtener productos", error);
        }
    }

    async eliminarPorId(id, res) {
        let data = JSON.parse(await fs.promises.readFile(`./src/${this.database}.txt`, "utf-8"));
        try {
        if (data.some((prod) => prod.id == id)) {
            let newData = data.filter((prod) => prod.id != id);
            await fs.promises.writeFile(`./src/${this.database}.txt`,JSON.stringify(newData));
            res.send("Eliminado con exito");
        } else {
            res.send("No existe ID");
        }
        } catch (error) {
        console.log("Error al eliminar por ID", error);
        }
    }

    async eliminarTodo() {
        let archivo = await fs.promises.readFile(`./src/${this.database}.txt`,"utf-8");
    
        try {
        if (!archivo) {
            console.log("El archivo no existe");
        } else {
            await fs.promises.writeFile(`./src/${this.database}.txt`,"[]");
    
            console.log("Todos los archivos han sido eliminados");
        }
        } catch (error) {
        console.log("Error al eliminar todos los archivos", error);
        }
    }

    async actualizarProducto(product, id, res) {
        try {
        let data = JSON.parse(await fs.promises.readFile(`./src/${this.database}.txt`,"utf-8")
        );
        let index = data.findIndex((x) => x.id == id);
    
        if (index !== -1) {
            data[index] = product;
            data[index].id = id;
            await fs.promises.writeFile(`./src/${this.database}.txt`,JSON.stringify(data));
            res.send("Producto actualizado");
        } else {
            res.send("Ese ID no existe");
        }
        } catch (error) {
            console.log("Error al actualizar producto", error);
        }
    }

    async buscarPorCarrito(id, res) {
        try {
            let data = JSON.parse(await fs.promises.readFile(`./src/${this.database}.txt`,"utf-8"));
            let objeto = data.find((prod) => prod.id == id);
            objeto !== undefined ? res.send(objeto.products) : res.send("No existe");
        } catch (error) {
            console.log("Error al leer", error);
        }
    }

    async agregarProductoACarrito(cartID, productID, res) {
        try {
            let data_product = JSON.parse(await fs.promises.readFile(`./src/productDB.txt`, "utf-8"));
            let data_cart = JSON.parse(await fs.promises.readFile(`./src/${this.database}.txt`,"utf-8"));

            let producto = data_product[data_product.findIndex(x => x.id == productID)]
            let cart = data_cart[data_cart.findIndex(x => x.id == cartID)]
            cart.products.push(producto);
            data_cart = data_cart.filter( x => x.id !== cart.id)
            console.log('data_cart', data_cart)
            data_cart.push(cart);
            console.log('data_cart + objeto', data_cart)
            await fs.promises.writeFile(`./src/${this.database}.txt`,JSON.stringify(data_cart));
            res.send("Agregado con exito");
        } catch (error) {
            console.log("Error al agregar al carrito", error);
        }
    }

    async eliminarProdCarrito(cartID, productID, res) {
        try {
            let data_cart = JSON.parse(await fs.promises.readFile(`./src/${this.database}.txt`,"utf-8"));
    
            let cart = data_cart[data_cart.findIndex(x => x.id == cartID)]
    
            cart.products.splice(cart.products.findIndex(x => x.id == productID), 1)
    
            data_cart = data_cart.filter((c) => c.id !== cart.id);
    
            data_cart.push(cart);
    
            await fs.promises.writeFile(`./src/${this.database}.txt`,JSON.stringify(data_cart));
    
            res.send(`El producto con ID ${productID} ha sido eliminado del carrito NRO ${cartID}`);
        } catch (error) {
            console.log("Error al  eliminar", error);
        }
    }

    async agregarCarrito(objeto, res) {
        let data = JSON.parse(await fs.promises.readFile(`./src/${this.database}.txt`, "utf-8"));
        try {
            let id = JSON.parse(
            await fs.promises.readFile(`./proyecto/src/${this.idDb}.txt`, "utf-8"));
            let maxID = Math.max(...id);
            objeto.id = maxID + 1;
            id = [...id, objeto.id];
            await fs.promises.writeFile(`./src/${this.idDb}.txt`,JSON.stringify(id));
            
            let productos = JSON.parse(await fs.promises.readFile(`./src/${this.database}.txt`,"utf-8"));
            objeto.products = []
            productos.push(objeto);
            
            await fs.promises.writeFile(`./src/${this.database}.txt`,JSON.stringify(productos));
            
            res.send("Agregado exitosamente");
                
            } catch (error) {
                console.log("Error al guardar", error);
        }
    }
}

module.exports = Contenedor;