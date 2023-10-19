import { Material } from "../Modelo/Material.js";

export class MaterialCTRL {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {      
      const dados = requisicao.body;
      const item = dados.item;
          
        const material = new Material(0, item);        
        await material.gravar();
            resposta.json({
              status: true,
              id: material.id,
              mensagem: "Material registrada",
            });
        
    }
  }
 
  
  async atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "PUT") {
      try {
      const dados = requisicao.body;
      const id = dados.id;
      const item = dados.item;

          const material = new Material(id, item);
          await material.atualizar();

          resposta.json({
            status: true,
            mensagem: "Material atualizada com sucesso!",
          });
        
        
      } catch (erro) {
        resposta.json({
          status: false,
          mensagem: "Material não encontrada!",
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

}
