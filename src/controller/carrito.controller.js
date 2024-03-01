class Carrito_Controller{
    constructor({carrito_model}){
        this.carrito_model = carrito_model
    }

    create = async (req, res) => {
        try {
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
            const {userInfo,userDireccion,tiendasDistancias} = direccion

            const id_direccion = userInfo[0].user.users_cliente.id_direccion

            const direccion_id = userDireccion.map(({id,distancia,direccion}) => ({
                id,
                distancia,
                direccion
            }));

            const distanciaValor = tiendasDistancias.map(({id,id_tienda,valor,desde,hasta}) => ({
                id,
                id_tienda,
                valor,
                desde,
                hasta
            }));


            const direccionfiltrada = direccion_id
            .filter(cion => {
                return cion.id === id_direccion;
            })
            .map(({ id, distancia, direccion }) => ({ id, distancia, direccion }));


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

            const NewPedido = await this.carrito_model.CreatePedido({data: [req.body, valores,valor_total]})
            if (!NewPedido) {
                return res.status(400).json({
                    error: 'Error al crear el pedido'
                });
            }
            const PedidoEstado = await this.carrito_model.CreatePedidoEstado({id_pedido: NewPedido.id})

            const valoresPedidosProductos = {
                val_unitario: valores.valor_producto,
                val_unitario_promocion: valores.valor_descuento,
                val_teorico: precios.cantidad * valores.valor_producto,
                val_final: precios.cantidad * valores.valor_descuento,
                id_promocion: precios.descuento[0].id_promocion,
                id_producto: precios.id_producto,
                id_pedido: NewPedido.id
            }

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