import { Router } from "express";
import Carrito_Controller from "../controller/carrito.controller.js";

export const create_carrito_router = ({carrito_model}) =>{
    const carrito_router = Router();

    const carrito_controller = new Carrito_Controller({carrito_model});

    carrito_router.get('/carrito' , carrito_controller.getCarritos);

    carrito_router.post('/pedidos' , carrito_controller.CreatePedido);

    carrito_router.post('/crear', carrito_controller.create);

    return carrito_router
};