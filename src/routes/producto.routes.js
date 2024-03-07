import { Router } from "express";
import Producto_controller from "../controller/producto.controller.js";

export const create_producto_router = ({producto_model}) =>{

    const producto_router = Router();

    const producto_controller = new Producto_controller({producto_model});

    producto_router.get('/verTodos', producto_controller.getAll);

    producto_router.get('/verUno/:id', producto_controller.getOne);

    producto_router.post('/crear', producto_controller.create);

    producto_router.put('/actualizar/:id', producto_controller.update);

    producto_router.delete('/eliminar/:id', producto_controller.delete);


    return producto_router
}