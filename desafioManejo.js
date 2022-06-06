const fs = require('fs')

class Contenedor {
    constructor(archivo){
        this.archivo = archivo
        fs.promises.writeFile(this.archivo, '[]');
}

    async save (objeto) {
        
            let datos = await fs.promises.readFile(this.archivo, 'utf-8');
            let arregloDatos = JSON.parse(datos);
        try {
            arregloDatos = arregloDatos.concat(objeto);
            objeto.id = arregloDatos.length;
            await fs.promises.writeFile (this.archivo, JSON.stringify(arregloDatos));
            return objeto.id;
        } catch (error) {
            console.log(`Error al guardar el  archivo ${error}`);
        }
    };

    async getById (nId) {
        let datos = await fs.promises.readFile(this.archivo, 'utf-8');
        let arregloDatos =JSON.parse(datos);
        let buscarID = arregloDatos.find(({id}) => id ==nId);
        try {
        if (buscarID == undefined) {
            console.log(null);
        } else {
            console.log(`Producto: ${nId} => ${nId.nombre}`)
        }
        } catch (error) {
            console.log(`Producto no encontrado ${error}`);
        }
        return buscarID;
    }

    async getAll () {
        try {
            let datos = await fs.promises.readFile(this.archivo, 'utf-8');
            let arregloDatos =JSON.parse(datos);
            return arregloDatos;
        } catch (error) {
            console.log('Datos no encontrados');
        }
    }

    async deleteById (nId) {
        let datos = await fs.promises.readFile(this.archivo, 'utf-8');
        let arregloDatos =JSON.parse(datos);
        try {
            let buscarID = arregloDatos.filter(({id}) => id != nId);
            await fs.promises.writeFile(this.archivo,JSON.stringify(buscarID));
        } catch (error) {
            console.log(`Error al eliminar el archivo ${error}`);
        }
    }

    async deleteAll () {
        fs.promises.writeFile(this.archivo, '');
        console.log('Se han borrado todos los archivos');
    };
}; 


const productos = new Contenedor ('./productos.json');

const guardar = async () => {
    await productos.save({
    nombre: "Tijera",
    precio: "80",
    thumbnail: "tijera",
    })

    productos.save({
    nombre: "Lapiz",
    precio: "25",
    thumbnail: "lapiz",
    })
};

guardar();