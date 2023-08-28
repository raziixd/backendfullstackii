import { Doacao } from "../Modelo/Doacao.js";
export class DoacaoCTRL {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const id = dados.id;
      const itemDoado = dados.itemDoado;
      const valorDoado = dados.valorDoado;
      const nome = dados.nome;
      
      if (
        id &&
        itemDoado &&
        valorDoado &&
        nome 
      ) {
        const doacao = new Doacao(
            id &&
            itemDoado &&
            valorDoado &&
            nome 
        );

        doacao
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Doacao cadastrada com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe TODOS os dados!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido ou usuário JSON não fornecido!",
      });
    }
  }

  atualizar(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "PUT" && requisicao.is("application/json")) {
        const dados = requisicao.body;
        const id = dados.id;
        const itemDoado = dados.itemDoado;
        const valorDoado = dados.valorDoado;
        const nome = dados.nome;
      if (
        id &&
        itemDoado &&
        valorDoado &&
        nome 
      ) {
        const doacao = new Doacao(
            id &&
            itemDoado &&
            valorDoado &&
            nome 
        );

        doacao
          .atualizar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Doacao atualizada com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe TODOS os dados!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido ou usuário JSON não fornecido!",
      });
    }
  }

  excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const id = dados.id;

      if (id) {
        const doacao = new Doacao(id);

        doacao
          .removerDoBancoDados()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Doacao removido com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o id!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido ou usuário JSON não fornecido!",
      });
    }
  }

  consultar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "GET") {
      const doacao = new Doacao();

      doacao
        .consultar("")
        .then((doacaos) => {
          resposta.status(200).json(doacaos);
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido!",
      });
    }
  }

  consultarPeloCPF(requisicao, resposta) {
    resposta.type("application/json");
    const id = requisicao.params["id"];

    if (requisicao.method === "GET") {
      const doacao = new Doacao();
      doacao
        .consultarCPF(cpf)
        .then((doacaos) => {
          resposta.status(200).json(doacaos);
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido!",
      });
    }
  }
}
