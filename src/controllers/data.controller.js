const { criarOuAtualizar, pegarDados } = require("../utils");

module.exports = {
  async listarDatas(requisicao, resposta) {
    const { mes } = requisicao.params; 
    // URL = http://localhost:3333/listarDatas/11

    if (mes > 12 || mes < 1) {
      return resposta.status(400).send({ mensagem: "Mês inválido, digite um valor entre 1 e 12" });
    }

    var dataAtual = new Date();
    var anoAtual = dataAtual.getFullYear();

    const getAllDaysInMonth = (mes, anoAtual) =>
      Array.from(
        { length: new Date(anoAtual, mes, 0).getDate() }, // get next month, zeroth's (previous) day
        (_, i) => new Date(anoAtual, mes - 1, i + 1) // get current month (0 based index)
      );

    const allDates = getAllDaysInMonth(mes, anoAtual);

    diasDoMes = (
      allDates.map((x) =>
        x.toLocaleDateString([], {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })
      )
    );

    return resposta
      .status(200)
      .send({ 'Dias do Mes' : diasDoMes });
  },

};
