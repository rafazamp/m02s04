const { Router } = require("express");

const datasRouter = Router();
const { listarDatas } = require("../controllers/data.controller");

datasRouter.get("/listarDatas/:mes", listarDatas);

module.exports = datasRouter;
