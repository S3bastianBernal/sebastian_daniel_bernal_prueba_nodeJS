class Carrito_Controller{
    constructor({carrito_model}){
        this.carrito_model = carrito_model
    }

    create = async (req, res) => {
        try {
            // se creo la instancia donde se manda la solicitud de la creacion del carrito y se les pasa los datos para su respectivi filtro
            const newCarrito = await this.carrito_model.create({ input: req.body });
            return res.status(201).json(newCarrito);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Error al crear el producto' });
        }
    }

    getCarritos = async (req, res) => {
        try {
            const carritos = await this.carrito_model.getCarritos({ datos: req.body })

            // se itera los datos de carritos para obtner los descuentos a traves de la tiendas
            const descuento = carritos.map((des) =>{
                const {Tienda} = des
                const promo = Tienda.promociones
                return promo[0]
            })

            // se itera los los datos de carritos para enviar una consulta lo mas similar al ejemplo
            const test = carritos.map((carrito) => {
                return{
                    id_producto: carrito.id_producto,
                    nombre: carrito.producto.nombre,
                    presentacion: carrito.producto.presentacion,
                    barcode: carrito.producto.barcode,
                    valor: carrito.producto.tiendas_producto.valor,
                    cantidad: carrito.cantidad,
                    valor_total: carrito.producto.tiendas_producto.valor*carrito.cantidad,
                    descuento: descuento.map(({id, nombre, porcentaje }) => ({
                        id_promocion:id,
                        nombre,
                        porcentaje,
                        valor_promocion: carrito.producto.tiendas_producto.valor*porcentaje/100
                    }))
                }
            })
            
            return res.status(200).json({
                "message": "Consultado Correctamente",
                "data": test
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Error al crear el producto' });
        }
    }


    CreatePedido = async (req,res) =>{
        try {
            const direccion = await this.carrito_model.getDireccion({datos: req.body});

            // se destructura los datos para la creacion del pedido
            const {userInfo,userDireccion,tiendasDistancias} = direccion

            const id_direccion = userInfo[0].user.users_cliente.id_direccion

            // se itera para obtener solo los datos que vamos a usar
            const direccion_id = userDireccion.map(({id,distancia,direccion}) => ({
                id,
                distancia,
                direccion
            }));

            
            // se itera para obtener solo los datos que vamos a usar
            const distanciaValor = tiendasDistancias.map(({id,id_tienda,valor,desde,hasta}) => ({
                id,
                id_tienda,
                valor,
                desde,
                hasta
            }));


            // se itera para obtener solo las direcciones con el id relacionado
            const direccionfiltrada = direccion_id
            .filter(cion => {
                return cion.id === id_direccion;
            })
            .map(({ id, distancia, direccion }) => ({ id, distancia, direccion }));


            // se itera para oobtener la direccion la cual esta dentro del rango
            const valorFiltrada = distanciaValor
            .filter(val =>{
                return direccionfiltrada[0].distancia >= val.desde && direccionfiltrada[0].distancia <= val.hasta|| val.hasta === null
            }).map(({id,id_tienda,valor,desde,hasta}) => ({id,id_tienda,valor,desde,hasta}));


            const carritos = await this.carrito_model.getCarritos({ datos: req.body })


            const descuento = carritos.map((des) =>{
                const {Tienda} = des
                const promo = Tienda.promociones
                return promo[0]
            })
            
            const test = carritos.map((carrito) => {
                return{
                    id_producto: carrito.id_producto,
                    nombre: carrito.producto.nombre,
                    presentacion: carrito.producto.presentacion,
                    barcode: carrito.producto.barcode,
                    valor: carrito.producto.tiendas_producto.valor,
                    cantidad: carrito.cantidad,
                    valor_total: carrito.producto.tiendas_producto.valor*carrito.cantidad,
                    descuento: descuento.map(({id, nombre, porcentaje }) => ({
                        id_promocion:id,
                        nombre,
                        porcentaje,
                        valor_promocion: carrito.producto.tiendas_producto.valor*porcentaje/100
                    }))
                }
            })
    
            const precios = test[0]

            const valores = {
                valor_producto: precios.valor_total,
                valor_descuento: precios.valor_total - precios.cantidad*precios.descuento[0].valor_promocion,
                valor_envio: valorFiltrada[0].valor,
                direccion: direccionfiltrada[0].direccion 
            }   


            const valor_total = valores.valor_producto + valores.valor_descuento + valores.valor_envio;

            // se hace la peticion para crear el pedido con los datos extraidos anteriormente
            const NewPedido = await this.carrito_model.CreatePedido({data: [req.body, valores,valor_total]})
            
            //se valida que el pedido se creara exitosamente
            if (!NewPedido) {
                return res.status(400).json({
                    error: 'Error al crear el pedido'
                });
            }
            // se hace la peticion para crear el estado del pedido anterior con el id del mismo
            const PedidoEstado = await this.carrito_model.CreatePedidoEstado({id_pedido: NewPedido.id})

            // se crea la estructura de los datos para la creacion de pedidos_productos
            const valoresPedidosProductos = {
                val_unitario: valores.valor_producto,
                val_unitario_promocion: valores.valor_descuento,
                val_teorico: precios.cantidad * valores.valor_producto,
                val_final: precios.cantidad * valores.valor_descuento,
                id_promocion: precios.descuento[0].id_promocion,
                id_producto: precios.id_producto,
                id_pedido: NewPedido.id
            }

            // por ultimo se hace la peticion para la creacion del dato dentro de la tabla de pedidos_productos
            const newPedidoProducto = await this.carrito_model.CreatePedidosProductos({data: valoresPedidosProductos})
            
            return res.status(201).json({
                message: 'Pedidos y Pedidos_estado fueron creados correctamente',
                data: valoresPedidosProductos
            });

        } catch (error) {
            console.error(error);
        }
    }

}


export default Carrito_Controller;