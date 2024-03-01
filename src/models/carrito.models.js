import Carrito from "../schemas/carrito.schemas.js";
import Tienda from "../schemas/tiendas.schema.js";
import Producto from "../schemas/productos.schemas.js";
import Tienda_Productos from "../schemas/tienda_productos.schema.js";
import Promocion from "../schemas/promocion.schema.js";
import TiendaPromocion from "../schemas/tiendas_descuentos.schemas.js";
import Pedidos from "../schemas/pedidos.schema.js";
import UserDireccion from "../schemas/user_direcciones.schemas.js";
import User from "../schemas/user.schema.js";
import TiendaDistancia from "../schemas/tienda_distancia.schema.js";
import UserCliente from "../schemas/users_clientes.schema.js";
import PedidoProducto from "../schemas/pedidos_productos.schema.js";


import { Op, Sequelize } from "sequelize";
import PedidosEstados from "../schemas/pedidos_estado.schema.js";


Carrito.belongsTo(Producto,{foreignKey: 'id_producto'});
Producto.belongsTo(Carrito,{foreignKey: 'id'});

Carrito.belongsTo(Tienda,{foreignKey: 'id_tienda'});
Tienda.belongsTo(Carrito,{foreignKey: 'id'});

Producto.belongsTo(Tienda_Productos,{foreignKey: 'id', targetKey: 'id_producto'});

Carrito.belongsTo(User,{foreignKey: 'id_user'});
User.belongsTo(Carrito,{foreignKey: 'id'});

User.belongsTo(UserCliente,{foreignKey: 'id', targetKey: 'id_user'});

UserCliente.belongsTo(UserDireccion,{foreignKey: 'id_user', targetKey: 'id_user'});
UserDireccion.belongsTo(UserCliente,{foreignKey: 'id_user', targetKey: 'id_user'});


Tienda.belongsTo(TiendaDistancia,{foreignKey: 'id', targetKey: 'id_tienda'})






class Carrito_model {
    static async create({input}){
        try {
            const {cantidad, id_producto, id_tienda, id_user} = input
            const buscarTienda = await Tienda.findOne({where: {id:id_tienda}});
            if (!buscarTienda) {
                return console.log("no se encontro la tienda que intenstas registrar");
            }
            const buscarProducto = await Producto.findOne({where: {id:id_producto}});
            if (!buscarProducto) {
                return console.log("no se encontro el producto que intentas registrar");
            }
            const newCarrito = await Carrito.create({cantidad, id_producto, id_tienda, id_user})

            return newCarrito

        } catch (error) {
            console.error(error);
        }
    }

    static async getCarritos({datos}){
        try {   
            const {id_tienda, id_user} = datos
            const carrito = await Carrito.findAll({
                where: {
                    id_tienda: id_tienda,
                    id_user: id_user
                },
                attributes: ['id_producto','cantidad'],
                include: [
                    {
                        model: Producto,
                        attributes: ["nombre","presentacion", "barcode"],
                        include:[
                            {
                                model: Tienda_Productos,
                                where: {
                                    id_tienda: id_tienda,
                                    id_producto: Sequelize.col('Producto.id')
                                },
                                attributes: ["valor"]
                            }
                        ]
                    },
                    {
                        model: Tienda,
                        attributes: ['id'],
                        include:[
                            {
                                model: Promocion,
                                attributes: ['id','nombre','porcentaje'],
                                through: {model: TiendaPromocion,where: {
                                    id_tienda:id_tienda,
                                    estado: true,
                                    inicio: {[Op.lte]: new Date()},
                                    fin: {[Op.gte]: new Date()}
                                },
                                attributes:[]
                                },
                                required: false
                            }
                        ],
                        
                    }
                ]
            });
            return carrito
        } catch (error) {
            console.error(error);
        }
    }

    static async getDireccion({datos}){
        try {  
            const {id_tienda, id_user} = datos
            const userInfo = await Carrito.findAll({
                    where: {
                        id_tienda: id_tienda,
                        id_user: id_user
                    },
                    include:[
                        {
                            model: User,
                            include: [
                                {
                                    model: UserCliente,
                                    where: {
                                        id_user: id_user
                                    },
                                }
                            ]
                        },
                    ],
                    group: ['User.id']
            });

            const userDireccion = await UserDireccion.findAll({
                where: {
                    id_user: id_user
                }
            })

            const tiendasDistancias = await TiendaDistancia.findAll({
                where: {
                    id_tienda: id_tienda
                }
            });

            return {userInfo,userDireccion,tiendasDistancias}
        } catch (error) {
            console.error(error);
        }
        
    }

    


    static async CreatePedido({data}){
        try {
            console.log(data[1]);
            const NewPedido = await Pedidos.create({
                instrucciones: data[0].instrucciones,
                entrega_fecha: data[0].entrega_fecha,
                valor_productos: data[1].valor_producto,
                valor_descuento: data[1].valor_descuento,
                valor_envio: data[1].valor_envio,
                valor_final: data[2],
                direccion: data[1].direccion,
                id_tienda: data[0].id_tienda,
                id_user: data[0].id_user,
            })
            
            return NewPedido
        } catch (error) {
            console.error(error);
        }
    }

    static async CreatePedidoEstado({id_pedido}){
        const estadoPedido = await PedidosEstados.create({id_pedido})
    }

    static async CreatePedidosProductos({data}){
        try {
        
            const newPedidosProductos = await PedidoProducto.create({
                valor_unitario: data.val_unitario,
                valor_unitario_promocion: data.val_unitario_promocion,
                total_teorico: data.val_teorico,
                total_final: data.val_final,
                id_promocion: data.id_promocion,
                id_producto: data.id_producto,
                id_pedido: data.id_pedido,
            })
            return newPedidosProductos;
        } catch (error) {
            console.error(error);
        }
    }
}


export default Carrito_model