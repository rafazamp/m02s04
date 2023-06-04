const { Router } = require("express");

const orderRouter = Router();
const { ordenarLista } = require("../controllers/order.controller");

orderRouter.patch("/ordenarLista", ordenarLista);

module.exports = orderRouter;
