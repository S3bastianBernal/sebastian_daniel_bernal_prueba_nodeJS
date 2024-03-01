import Pedidos from "../schemas/pedidos.schema.js";
import PedidosEstados from "../schemas/pedidos_estado.schema.js";
import Tienda from "../schemas/tiendas.schema.js";
import Tienda_Productos from "../schemas/tienda_productos.schema.js";
import PedidoProducto from "../schemas/pedidos_productos.schema.js";
import Producto from "../schemas/productos.schemas.js";
import Promocion from "../schemas/promocion.schema.js"

import { Sequelize } from "sequelize";


Pedidos.belongsTo(PedidosEstados, {foreignKey: "id", targetKey: "id_pedido"});
PedidosEstados.belongsTo(Pedidos, {foreignKey: "id_pedido"});

Pedidos.belongsTo(PedidoProducto, {foreignKey: "id", targetKey: "id_pedido"});
PedidoProducto.belongsTo(Pedidos, {foreignKey: "id_pedido"});

Pedidos.belongsTo(Tienda, {foreignKey: "id_tienda", targetKey: "id"});

Tienda.belongsTo(Tienda_Productos, {foreignKey: "id", targetKey: "id_tienda"});

PedidoProducto.belongsTo(Promocion, {foreignKey: "id_promocion", targetKey: "id"});

Tienda_Productos.belongsTo(Producto, {foreignKey: "id_producto", targetKey: "id"});


class Pedidos_model {
    static async getAll({data}) {
        try {
            const {id_user} = data;
            console.log(data);
            const pedidos = await Pedidos.findAll({
                where: {
                    id_user: id_user
                },
                include: [
                    {
                        model: PedidosEstados
                    },
                    {
                        model: PedidoProducto,
                        include: [
                            {
                                model: Promocion
                            }
                        ]
                    },
                    {
                        model: Tienda,
                        include: [
                            {
                                model: Tienda_Productos,
                                where: {
                                    id_tienda: Sequelize.col('Tienda.id')
                                },
                                include: [
                                    {
                                        model: Producto
                                    }
                                ]
                            }
                        ],
                    }
                ],
                group: ['Tienda.id']
            });
            return pedidos;
        } catch (error) {
            console.error(error);
        }
    }
}

export default Pedidos_model;