const { Router } = require("express");

const rotasDoProtudo = Router();

const {
  cadastrarProduto,
  inverteNomeProduto,
} = require("../controllers/produto.controller");

rotasDoProtudo.post("/cadastrarProduto", cadastrarProduto);

rotasDoProtudo.post("/inverteNomeProduto", inverteNomeProduto);

module.exports = rotasDoProtudo;
