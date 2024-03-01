import TiendaProductos from "../schemas/tienda_productos.schema.js";
import Producto from "../schemas/productos.schemas.js";
import Tienda from "../schemas/tiendas.schema.js";
import TiendaPromocion from "../schemas/tiendas_descuentos.schemas.js";
import Promocion from "../schemas/promocion.schema.js";



Tienda.belongsToMany(Producto, {through: TiendaProductos, foreignKey: "id_tienda"});
Producto.belongsToMany(Tienda, {through: TiendaProductos, foreignKey: "id_producto"});
Tienda.belongsToMany(Promocion, {through: TiendaPromocion, foreignKey: "id_tienda"});
Promocion.belongsToMany(Tienda, {through: TiendaPromocion, foreignKey: "id_promocion"});


class Tienda_Productos_models{
    
    static async getAll(){
        try {
            const productos = await TiendaProductos.findAll();
            console.log(productos);
            return productos
        } catch (error) {
            console.error(error);
        }
    }

    static async create({input}){
        try {
            const {compra_maxima,valor,id_promocion, id_tienda, id_producto} = input
            const buscarTienda = await Tienda.findOne({where: {id:id_tienda}});
            if (!buscarTienda) {
                return console.log("no se encontro la tienda que intenstas registrar");
            }
            const buscarProducto = await Producto.findOne({where: {id:id_producto}});
            if (!buscarProducto) {
                return console.log("no se encontro el producto que intentas registrar");
            }
            const producto = await TiendaProductos.create({ compra_maxima, valor, id_promocion, id_tienda, id_producto });
            return producto
        }catch (error) {
         console.error(error);   
        }
        
    }

    static async getCatalogo({id_tienda}){
        try {
            const tienda = await Tienda.findByPk(id_tienda,{
                include:[
                    {
                        model : Producto,
                        through: {model: TiendaProductos} // Tabla intermediaria entre Productos y Tiendas
                        
                    },
                    {
                        model : Promocion,
                        through: {model: TiendaPromocion} // Tabla intermediaria entre Promocion y Tiendas
                        
                    }
                ]
              });

              
              return(tienda);
          } catch (error) {
            console.error('Error:', error);
            throw new Error('Hubo un error al obtener los productos de la tienda');
          }
    }

}


export default Tienda_Productos_models