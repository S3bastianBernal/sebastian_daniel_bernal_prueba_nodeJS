import express from "express";
import cors from "cors"
import { create_producto_router } from "../routes/producto.routes.js";
import { create_tienda_producto_router } from "../routes/tienda.routes.js";
import { create_carrito_router } from "../routes/carrito.routes.js";
import { create_pedidos_router } from "../routes/pedidos.routes.js";
import Producto_model from "../models/productos.model.js";
import Tienda_Productos_models from "../models/tiendas_productos.models.js";
import Carrito_model from "../models/carrito.models.js";
import Pedidos_models from "../models/Pedidos.models.js";

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000
        this.pahts = {
            productos:"/api/productos",
            tienda_productos:"/api/tiendaproductos",
            carrito:"/api/carrito",
            pedidos:"/api/pedidos"
        }
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.pahts.productos, create_producto_router({producto_model: Producto_model}));
        this.app.use(this.pahts.tienda_productos, create_tienda_producto_router({tienda_producto_model: Tienda_Productos_models}));
        this.app.use(this.pahts.carrito, create_carrito_router({carrito_model: Carrito_model}));
        this.app.use(this.pahts.pedidos, create_pedidos_router({pedidos_model: Pedidos_models}));
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`server is running on port ${this.port}`);
        })
    }
}

export default Server