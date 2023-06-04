const { criarOuAtualizar, pegarDados } = require("../utils");
var path = require("path");

const pathjson = path.join(__dirname, "../database/user.json");

module.exports = {
  async listarUser(requisicao, resposta) {
    const { ageMin, ageMax, State, Job } = requisicao.query; // Parametro opcional de busca

    // Criação de objeto para filtrar os dados
    var filter = {};
    if (requisicao.query.State) filter.State = requisicao.query.State;
    if (requisicao.query.Job) filter.Job = requisicao.query.Job;
    if (requisicao.query.ageMin) filter.ageMin = requisicao.query.ageMin;
    if (requisicao.query.ageMax) filter.ageMax = requisicao.query.ageMax;

    //Chama a função pegarDados, que se existir, retorna o JSON, se não retorna null
    const users = pegarDados(pathjson);

    // Se não tiver nenhum dado, retorna 204
    if (!users) {
      return resposta.status(204).send();
    }

    // função para validar dados, se houver pelo menos uma propriedade válida, retorna true, se não false
    const existeDadosValidos = Object.keys(users[0]).some((propriedade) => {
      return (
        propriedade === "name" ||
        propriedade === "age" ||
        propriedade === "job" ||
        propriedade === "state"
      );
    });

    // Caso seja falso, retorna 204
    if (!existeDadosValidos) {
      return resposta.status(400).send({ mensagem: "Não tem dados válidos" });
    }

    // Se não tiver a informação da busca, retorna todos os dados dos users
    if (!Job && !State && !ageMin && !ageMax) {
      return resposta
        .status(200)
        .send({ mensagem: "Relação de usuários salvos:", dados: users });
    }

    const usersFiltrados = users.filter((user) => {
      if (filter.Job && !user.job.includes(filter.Job)) return false;
      if (filter.State && !user.state.includes(filter.State)) return false;
      if (filter.ageMin && user.age < filter.ageMin) return false;
      if (filter.ageMax && user.age > filter.ageMax) return false;
      return true;
    });

    return resposta
      .status(200)
      .send({ mensagem: "Usuários filtrados:", dados: usersFiltrados });
  },

  async atualizarUser(requisicao, resposta) {
    //Desestruturação para pegar as propriedades dentro do objeto requisicao.body
    const { id } = requisicao.params;
    const { name, age, job, state } = requisicao.body;
    const users = pegarDados(pathjson);

    // Se não houver users, lança um erro na requisição
    if (!users || users.length === 0) {
      return resposta
        .status(400)
        .send({ mensagem: "A base de usuários está vazia" });
    }

    // Verificar se tem usuário com o id enviado, se houver pelo menos um, retorna true, se não false
    const existeID = users.find((user) => user.id == id); //some ou find
    if (!existeID) {
      return resposta
        .status(404)
        .send({ mensagem: "Não existe usuário com o ID informado: " + id });
    }

    // Se nenhum dado for informado para ser alterado, retorna 404
    if (!name && !age && !job && !state) {
      return resposta
        .status(404)
        .send({ mensagem: "Entre com um dado a ser alterado" });
    }

    // Altera os dados do usuário
    const alterarDados = users.map((user) => {
      if (user.id == id) {
        return {
          id: user.id,
          name: name ? name : user.name,
          age: age ? age : user.age,
          job: job ? job : user.job,
          state: state ? state : user.state,
        };
      }
      return user;
    });

    criarOuAtualizar(pathjson, alterarDados);
    return resposta
      .status(200)
      .send({ mensagem: "Atualizou as informações do usuários" });
  },

  async apagarUser(requisicao, resposta) {
    const { id } = requisicao.params;
    const users = pegarDados(pathjson);

    // Se não houver users, lança um erro na requisição
    if (!users || users.length === 0) {
      return resposta
        .status(400)
        .send({ mensagem: "A base de usuários está vazia" });
    }

    // Verificar se tem usuário com o id enviado, se houver pelo menos um, retorna true, se não false
    const existeID = users.find((user) => user.id == id); //some ou find
    if (!existeID) {
      return resposta
        .status(404)
        .send({ mensagem: "Não existe usuário com o ID " + id });
    }

    const userFilter = users.filter((user) => user.id != id);

    criarOuAtualizar(pathjson, userFilter);
    return resposta
      .status(200)
      .send({ mensagem: "Usuário excluído com sucesso" });
  },

  async retornaUser(requisicao, resposta) {
    const { id } = requisicao.params;
    const users = pegarDados(pathjson);

    // Se não houver users, lança um erro na requisição
    if (!users || users.length === 0) {
      return resposta
        .status(400)
        .send({ mensagem: "A base de usuários está vazia" });
    }

    // Verificar se tem usuário com o id enviado, se houver pelo menos um, retorna true, se não false
    const existeID = users.find((user) => user.id == id); //some ou find
    if (!existeID) {
      return resposta
        .status(404)
        .send({ mensagem: "Não existe usuário com o ID " + id });
    }

    return resposta.status(200).send({ "Nome do usuário": existeID.name });

    /*
    Faz a mesma coisa que a linha de código acima, porém com o filter
    const userFilter = users.filter((user) => user.id == id);
    return resposta
      .status(200)
      .send({ "Nome do usuário": userFilter[0]["name"] });
    */
  },
};
