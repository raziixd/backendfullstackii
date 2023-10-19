import { Doacao } from "../Modelo/Doacao.js";
import { Material } from "../Modelo/Material.js";
import { DoacaoMaterial } from "../Modelo/DoacaoMaterial.js";
import { Usuario } from "../Modelo/Usuario.js";

export class DoacaoMaterialCTRL {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {      
      const dados = requisicao.body;
      const idDoacao = dados.doacao.id;
      const idMaterial = dados.material.id;
      const quantidade = dados.quantidade;

      const doacao = new Doacao(0);
      const material = new Material(0);
      const existeDoacao = await doacao.consultarId(idDoacao);
      const existeMaterial = await material.consultarId(idMaterial);

      if (existeMaterial && existeDoacao) {
        try {      
          
        const material = new DoacaoMaterial(existeDoacao, existeMaterial, quantidade);        
        await material.gravar();
            resposta.json({
              status: true,
              id: material.id,
              mensagem: "Doação Material registrada",
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
          mensagem: "Doacao ou Material não encontrado!",
        });
      }
    }
  }
 
  
  async atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "PUT") {
      try {
        const dados = requisicao.body;
        const idDoacao = dados.doacao.id;
        const idMaterial = dados.material.id;
        const quantidade = dados.quantidade;
        const doacao = new Doacao(0);
        const material = new Material(0);
        const existeDoacao = await doacao.consultarId(idDoacao);
        const existeMaterial = await material.consultarId(idMaterial);
        if (existeMaterial && existeDoacao) {
            
          const doacaoMaterial = new DoacaoMaterial( existeDoacao, existeMaterial, quantidade);        
          await doacaoMaterial.atualizar();
              resposta.json({
                status: true,
                mensagem: "Doação Material registrada",
              });
        }
        } catch (erro) {
          resposta.json({
            status: false,
            mensagem: "Usuário não encontrado!",
          });
        }
    }
  }

  excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const idDoacao = dados.doacao.id;
      const idMaterial = dados.material.id;
      if (idDoacao && idMaterial ) {
        const doacaoMaterial = new DoacaoMaterial(idDoacao, idMaterial);

        doacaoMaterial
          .removerDoBancoDados()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Doacao Material removido com sucesso!",
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

      const doacaoMaterial = new DoacaoMaterial(0);

      doacaoMaterial
        .consultar()
        .then((doacaoMaterial) => {
          resposta.status(200).json(doacaoMaterial);
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
