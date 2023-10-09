import { Doacao } from "../Modelo/Doacao.js";
import { Material } from "../Modelo/Material.js";
import { Usuario } from "../Modelo/Usuario.js";

export class MaterialCTRL {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {      
      const dados = requisicao.body;
      const item = dados.item;
      const id_doacao = dados.id_doacao ;
      const qtd = dados.qtd;
      const cpfUsuario = dados.usuario.cpf;      
      const usuario = new Usuario(0, "");
      const existeUsuario = await usuario.consultar(cpfUsuario);
      const doacao = new Doacao(0,"","");
      const existeDoacao = await doacao.consultar(doacao.id)
      console.log(item)
      console.log(id_doacao)
      if (existeUsuario || existeDoacao) {
        try {      
          
        const material = new Material(0, id_doacao, item, qtd, cpfUsuario);        
        await material.gravar();
            resposta.json({
              status: true,
              id: material.id,
              mensagem: "Doação registrada",
            });
          
        }catch(erro) {
          resp.json({
            status: false,
            mensagem: "Usuário não encontrado!",
          });
        }
      } else {
        resp.json({
          status: false,
          mensagem: "Usuário não encontrado!",
        });
      }
    }
  }
  //     if (id && item && qtd && nome) {
  //       const doacao = new Material(id, item, qtd, nome);

  //       doacao
  //         .gravar()
  //         .then(() => {
  //           resposta.status(200).json({
  //             status: true,
  //             mensagem: "Doação cadastrada com sucesso!",
  //           });
  //         })
  //         .catch((erro) => {
  //           resposta.status(500).json({
  //             status: false,
  //             mensagem: erro.message,
  //           });
  //         });
  //     } else {
  //       resposta.status(400).json({
  //         status: false,
  //         mensagem: "Informe TODOS os dados!",
  //       });
  //     }
  //   } else {
  //     resposta.status(400).json({
  //       status: false,
  //       mensagem: "Método não permitido ou usuário JSON não fornecido!",
  //     });
  //   }
  // }

  
  async atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "PUT") {
      try {
      const dados = requisicao.body;
      const id = dados.id;
      const id_doacao = dados.id_doacao;
      const item = dados.itemDoado;
      const qtd = dados.qtd;
      const cpfUsuario = dados.usuario.cpf;
      const usuario = await new Usuario(0, "").consultarCPF(cpfUsuario)

        if (cpfUsuario) {
          const material = new Material(id, id_doacao, item, qtd, cpfUsuario);
          await material.atualizar();

          resposta.json({
            status: true,
            codigo: material.codigo,
            mensagem: "Doação atualizada com sucesso!",
          });
        } /*  else {
          resp.json({
            status: false,
            mensagem: "Usuário não encontrado!",
          });
        } */
      } catch (erro) {
        resposta.json({
          status: false,
          mensagem: "Usuário não encontrado!",
        });
      }
    }
  }

  // async atualizar(requisicao, resposta) {
  //   resposta.type("application/json");

  //   if (requisicao.method === "PUT" && requisicao.is("application/json")) {
  //     try{

      
  //     const dados = requisicao.body;
  //     const id = dados.id;
  //     const item = dados.item;
  //     const qtd = dados.qtd;
  //     const cpfUsuario = dados.usuario.cpf;
  //     const usuario = await new Usuario(0, "").consultarCPF(cpfUsuario)

  //     if (cpfUsuario) {
  //       const doacao = new Material (id, item, qtd, cpfUsuario);
  //       await doacao.atualizar();
  //       resposta.json({
  //         status: true,
  //         id: doacao.id,
  //         mensagem: "Doação atualizada!"
  //       })
  //     }
  //   }catch (erro) {
  //     resposta.json({
  //       status: false,
  //       mensagem: "Usuário não encontrado"
  //     })
  //   }
  

  //     if (id && item && qtd && cpfUsuario) {
  //       const doacao = new Material(id, item, qtd, cpfUsuario);

  //       doacao
  //         .atualizar()
  //         .then(() => {
  //           resposta.status(200).json({
  //             status: true,
  //             mensagem: "Material atualizada com sucesso!",
  //           });
  //         })
  //         .catch((erro) => {
  //           resposta.status(500).json({
  //             status: false,
  //             mensagem: erro.message,
  //           });
  //         });
  //     } else {
  //       resposta.status(400).json({
  //         status: false,
  //         mensagem: "Informe TODOS os dados!",
  //       });
  //     }
  //   } else {
  //     resposta.status(400).json({
  //       status: false,
  //       mensagem: "Método não permitido ou usuário JSON não fornecido!",
  //     });
  //   }
  // }

  excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const id = dados.id;

      if (id) {
        const material = new Material(id);

        material
          .removerDoBancoDados()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Material removido com sucesso!",
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
      const material = new Material();

      material
        .consultar("")
        .then((material) => {
          resposta.status(200).json(material);
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
      const material = new Material();
      material
        .consultarCPF(id)
        .then((material) => {
          resposta.status(200).json(material);
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
