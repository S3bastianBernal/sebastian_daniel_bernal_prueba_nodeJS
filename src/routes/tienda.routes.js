import { Router } from "express";

import Tienda_Producto_controller from "../controller/tienda.controller.js";

export const create_tienda_producto_router = ({tienda_producto_model}) =>{

    const tienda_producto_router = Router();

    const tienda_producto_controller = new Tienda_Producto_controller({tienda_producto_model});

    tienda_producto_router.get('/verTodos', tienda_producto_controller.getAll);

    tienda_producto_router.post('/crear', tienda_producto_controller.create);

    tienda_producto_router.get('/verCatalogo/:id', tienda_producto_controller.getCatalogo);


    return tienda_producto_router
}