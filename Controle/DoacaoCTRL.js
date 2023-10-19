import { Doacao } from "../Modelo/Doacao.js";
import { Usuario } from "../Modelo/Usuario.js";

export class DoacaoCTRL {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const valorDoado = dados.valorDoado;
      const cpfUsuario = dados.usuario.cpf;
       const usuario = new Usuario('');
       //erro aqui eh que o consultar cpf nao esta achando o usuario
       const existeUsuario = await usuario.consultarCPF(cpfUsuario);
       console.log('existe',existeUsuario.toJSON());
      if (existeUsuario) {
        try {        
        const doacao = new Doacao(0, valorDoado, existeUsuario);
        await doacao.gravar();
            resposta.json({
              status: true,
              id: doacao.id,
              mensagem: "Doação registrada",
            });
          
        }catch(erro) {
          resposta.json({
            status: false,
            mensagem: erro.message,
          });
        }
      } else {
         resposta.json({
          status: false,
          mensagem: "Usuário não encontrado!",
        });
      }
    }
  }
  
  async atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "PUT") {
      try {
      const dados = requisicao.body;
      const id = dados.id;
      const valorDoado = dados.valorDoado;
      const cpfUsuario = dados.usuario.cpf;
      const usuario = new Usuario(0);
      const existeUsuario = await usuario.consultarCPF(cpfUsuario)
      if(!existeUsuario) {
        resposta.json({
          status: false,
          mensagem: "Usuário não encontrado!",
        });
      } else {
        const doacao = new Doacao(id, valorDoado, existeUsuario);
        await doacao.atualizar();

        resposta.json({
          status: true,
          mensagem: "Doação atualizada com sucesso!",
        });
        
      }

      } catch (erro) {
        resposta.json({
          status: false,
          mensagem: " ERRO ao atualizar!",
        });
      }
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
      const doacao = new Doacao(0);

      doacao.consultar("")
        .then((doacao) => {
          resposta.status(200).json(doacao);
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
