const { criarOuAtualizar, pegarDados } = require("../utils");
var path = require("path");

const pathjson = path.join(__dirname, "../database/itens.json");

module.exports = {
  async cadastrarProduto(requisicao, resposta) {
    const { item } = requisicao.body;

    //Chama a função pegarDados, que se existir, retorna o JSON, se não retorna null
    const itens = pegarDados(pathjson);

    //Condicional para verificar se todos os campos estão preenchidos
    if (!item) {
      return resposta
        .status(400)
        .send({ mensagem: "Necessário preencher o nome do produto" });
    }

    if (!itens) {
      criarOuAtualizar(pathjson, [{ item }]);

      return resposta
        .status(200)
        .send({ mensagem: "Produto cadastrado com sucesso" });
    }

    const todosItens = [
      ...itens,
      {
        item,
      },
    ];

    criarOuAtualizar(pathjson, todosItens);
    return resposta
      .status(200)
      .send({ mensagem: "Produto cadastrado com sucesso" });
  },

  async inverteNomeProduto(requisicao, resposta) {
    const { item } = requisicao.body;

    //Condicional para verificar se o nome foi preenchido
    if (!item) {
      return resposta
        .status(400)
        .send({ mensagem: "Necessário preencher o nome do produto" });
    }

    //Condicional para verificar se o nome é uma string
    if (typeof item !== "string") {
      return resposta
        .status(400)
        .send({ mensagem: "O nome deve ser em texto" });
    }

    //Função que converte as letras maiúsculas em minúsculas e vice-versa
    var itemInvertido = item
      .split("")
      .map((char) =>
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      )
      .join("");
    return resposta.status(200).send({ item, itemInvertido });
  },
};
