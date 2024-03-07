class Producto_controller{
    constructor({producto_model}){
        this.producto_model = producto_model
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

    // ejemplo controller Crud Productos

    // GetAll
    getAll = async(req,res) =>{
        try {
            const productos = await this.producto_model.getAll()
            return res.json(productos);
        } catch (error) {
            console.error(error);
        }
    }

    // GetOne
    getOne = async(req,res) =>{
        try {
            const id = req.params.id
            const producto = await this.producto_model.getOne({id: id});
            return res.json(producto);
        } catch (error) {
            console.error(error);
        }
    }

    // Update
    update = async(req,res) =>{
        try {
            const id = req.params.id
            const producto = await this.producto_model.update({id: id, input: req.body});
            return res.json(producto);
        } catch (error) {
            console.error(error);
        }
    };

    // Delete
    delete = async(req,res) =>{
        try {
            const id = req.params.id
            const producto = await this.producto_model.delete({id: id});
            return res.json(producto);
        } catch (error) {
            console.error(error);
        }
    }




}

export default Producto_controller