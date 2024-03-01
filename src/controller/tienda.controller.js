
class Tienda_Producto_controller{
    constructor({tienda_producto_model}){
        this.tienda_producto_model = tienda_producto_model
    }

    getAll = async(req,res) =>{
        try {
            const Tienda_productos = await this.tienda_producto_model.getAll()
            return res.json(Tienda_productos);
        } catch (error) {
            console.error(error);
        }
    }

    create = async(req,res) =>{
        try {
            const newTiendaProducto = await this.tienda_producto_model.create({input: req.body});
            return res.status(201).json(newTiendaProducto);
        } catch (error) {
            console.error(error);
        }
    }

    getCatalogo = async(req,res) =>{
        try {
            const hoy = new Date();
            const id_tienda  = req.params.id 
            const catagolo = await this.tienda_producto_model.getCatalogo({id_tienda: id_tienda});

            // se destructuran los diferentes valores de la consulta
            const {productos,promociones} = catagolo

            // se mapea las promociones de la tabla
            const promocionest = promociones.map(({ id, nombre, porcentaje, tiendas_promociones }) => ({
                id_promocion: id,
                nombre,
                porcentaje,
                estado: tiendas_promociones.estado,
                inicio: new Date(tiendas_promociones.inicio),
                fin: new Date(tiendas_promociones.fin)
            }));

            // se hace el filtro para solo mostrar las promociones validas
            const promocion = promocionest
            .filter(promo => {
                return promo.estado === true && hoy >= promo.inicio && hoy <= promo.fin;
            })
            .map(({ id_promocion, nombre, porcentaje }) => ({ id_promocion, nombre, porcentaje }));

            
            // mapeo de la tabla de productos
            const productosInfo = productos.map(({ id, nombre, presentacion, barcode, tiendas_productos }) => ({
                id_tienda,
                id_produto: id,
                nombre,
                presentacion, 
                barcode,
                valor: tiendas_productos.valor,
                promociones : promocion.map(({id_promocion, nombre, porcentaje }) => ({
                    id_promocion,
                    nombre,
                    porcentaje,
                    valor_promocion: tiendas_productos.valor*porcentaje/100
                }))
            }))
            return res.status(200).json({
                "message": "Consultado Correctamente",
                "data": productosInfo
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export default Tienda_Producto_controller