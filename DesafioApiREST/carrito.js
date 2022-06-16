class Carrito {
    constructor(){
        this.carrito = [];
    }

    getProd(){
        return (this.carrito);
    }

    getById(id){
        const obj = this.carrrito.find(c=> c.id === id);
        if(obj = undefined){
            return {error: `Producto no encontrado`}
        }else {
            return obj;
        }
    }

    save(objeto){
        if(this.carrito == []){
            objeto.id = 1
        }else {
            objeto.id = this.carrito.length + 1
        }
        this.carrito.push(objeto);

        return objeto;
    }

    saveId(id,objeto){
        const nID = this.carrito.findIndex(c=> c.id === id);
        if(nID != -1){
            objeto.id = id;
            this.carrito[nID] = objeto;
            return this.carrito[nID];
        }else {
            return {error: `Producto no encontrado`}
        }
    }

    deleteProd(id){
        const nID = this.carrito.findIndex(c => c.id === id)
        if(nID != -1){
            this.carrito.splice(nID, 1);
            return ('Producto eliminado');
        }else {
            return {error: `Producto no encontrado`};
        }
    }
}


module.exports = Carrito;