import { Usuario } from "../Modelo/Usuario.js";
export class UsuarioCTRL {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const cpf = dados.cpf;
      const nome = dados.nome;
      const dataNasc = dados.dataNasc;
      const email = dados.email;
      const tel = dados.tel;
      const sexo = dados.sexo;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const treinador = dados.treinador;
      const jogador = dados.jogador;
      if (
        cpf &&
        nome &&
        dataNasc &&
        email &&
        tel &&
        sexo &&
        cidade &&
        uf &&
        treinador &&
        jogador
      ) {
        const usuario = new Usuario(
          cpf,
          nome,
          dataNasc,
          email,
          tel,
          sexo,
          cidade,
          uf,
          treinador,
          jogador
        );

        usuario
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Usuario cadastrado com sucesso!",
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
      const cpf = dados.cpf;
      const nome = dados.nome;
      const dataNasc = dados.dataNasc;
      const email = dados.email;
      const tel = dados.tel;
      const sexo = dados.sexo;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const treinador = dados.treinador;
      const jogador = dados.jogador;
      if (
        cpf &&
        nome &&
        dataNasc &&
        email &&
        tel &&
        sexo &&
        cidade &&
        uf &&
        treinador &&
        jogador
      ) {
        const usuario = new Usuario(
          cpf,
          nome,
          dataNasc,
          email,
          tel,
          sexo,
          cidade,
          uf,
          treinador,
          jogador
        );

        usuario
          .atualizar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Usuario atualizado com sucesso!",
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
      const cpf = dados.cpf;

      if (cpf) {
        const usuario = new Usuario(cpf);

        usuario
          .removerDoBancoDados()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Usuario removido com sucesso!",
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
          mensagem: "Informe o cpf!",
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

        const usuario = new Usuario('');

        usuario
        .consultar("")
        .then((usuarios) => {
          resposta.status(200).json(usuarios);
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
    const cpf = requisicao.params["cpf"];

    if (requisicao.method === "GET") {
      const usuario = new Usuario(cpf);

      usuario
      .consultarCPF(cpf)
        .then((usuarios) => {
          resposta.status(200).json(usuarios);
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
