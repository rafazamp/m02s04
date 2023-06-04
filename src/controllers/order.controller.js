module.exports = {
  async ordenarLista(requisicao, resposta) {
    const { indices } = requisicao.body;

    listaNomes = ["Pedro", "José", "Aderbal", "Danilo", "Luisa", "Vitoria"];

    let newIndices = indices.split(",");
    let indice1 = Number(newIndices[0]);
    let indice2 = Number(newIndices[1]);

    //Condicional para verificar se o nome foi preenchido
    if (!indices) {
      return resposta.status(400).send({
        mensagem: "Necessário preencher o os indíces no formato: 0,1",
      });
    }

    //Condicional para verificar se o nome foi preenchido
    if (indice1 < 0 || indice2 > 5 || indice2 < 0 || indice1 > 5) {
      return resposta.status(400).send({
        mensagem: "Os índices devem ser entre 0 e 5",
      });
    }

    //Função que troca os elementos de posição
    const swapElements = (array, index1, index2) => {
      listaNomes[index1] = listaNomes.splice(index2, 1, listaNomes[index1])[0];
    };

    swapElements(listaNomes, indice1, indice2);

    return resposta.status(200).send({ listaNomes });
  },
};
