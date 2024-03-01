class Producto_controller{
    constructor({producto_model}){
        this.producto_model = producto_model
    }

    getAll = async(req,res) =>{
        try {
            const productos = await this.producto_model.getAll()
            return res.json(productos);
        } catch (error) {
            console.error(error);
        }
    }

    create = async (req, res) => {
        try {
            console.log(req.body);
            const newProducto = await this.producto_model.create({ input: req.body });
            return res.status(201).json(newProducto);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al crear el producto' });
        }
    }
}

export default Producto_controller