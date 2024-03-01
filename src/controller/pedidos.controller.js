class Pedidos_controller{
    constructor({pedidos_model}){
        this.pedidos_model = pedidos_model
    }

    getAll = async(req,res) =>{
        try {
            //se hace la peticion para usar el modelo el cual consultara los datos de la tabal de pedidos y los datos asociados que se hallan definido en el modelo
            const pedidos = await this.pedidos_model.getAll({ data: req.body });

            // se usa un .length para saber la cantidad de pedidos realizados por el consumidor
            const catidadPedidos = pedidos.length

            // se el proceso matematico para obtener el valor de la promocion
            const valorPromociom = pedidos[0].Tienda.tiendas_producto.valor*pedidos[0].pedidos_producto.promocione.porcentaje/100

            // se iteran los datos del pedido para poder enviarlo de la manera mas similar al ejemplo proporcianado
            const pedidoArray = pedidos.map(({id,pedidos_producto,entrega_fecha,id_tienda,Tienda,pedidos_estado,valor_envio}) => ({
                id_tienda,
                nombre: Tienda.nombre,
                valor_pedidos: valor_envio,
                cantidad_pedidos: catidadPedidos,
                pedidos: {
                    id: id,
                    fecha: entrega_fecha,
                    estado: pedidos_estado.estado,
                    valor_final: pedidos_producto.total_final,
                    producto: {
                        id_producto: pedidos_producto.id_producto,
                        nombre: Tienda.tiendas_producto.producto.nombre,
                        cantidad: pedidos_producto.cantidad,
                        valor: Tienda.tiendas_producto.valor,
                        valor_promocion: valorPromociom,
                        valor_total: valorPromociom*pedidos_producto.cantidad
                    }
                }
            }))
            
            // se hace una condicion para prevenir que si el estado es mayor a 3 se continue el proceso 
            if (pedidos[0].pedidos_estado.estado >= 3) {
                return res.status(400).json({
                    "message": "Error en la Consulta",
                    "data": "el estado del Pedido no es valido"
                });
            }
            res.status(200).json({
                "message": "consultado correctamente",
                "data": pedidoArray
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export default Pedidos_controller;