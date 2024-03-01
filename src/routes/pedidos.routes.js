import { Router } from "express";
import Pedidos_controller from "../controller/pedidos.controller.js";

export const create_pedidos_router = ({pedidos_model}) =>{
    const pedidos_router = Router();

    const pedidos_controller = new Pedidos_controller({pedidos_model});

    pedidos_router.get('/GetPedidos', pedidos_controller.getAll);

    return pedidos_router
}