import { Material } from "../Modelo/Material.js";
import conectar from "./Conexao.js";
import  { Usuario } from "../Modelo/Usuario.js";
export class MaterialBD {
  async incluir(material) {
    if (material instanceof Material) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO material (item, qtd, cpfUsuario) VALUES (?,?,?)";
      const valores = [material.item, material.qtd, material.cpfUsuario];
      await conexao.query(sql, valores);
    }
  }

  async alterar(material) {
    if (material instanceof Material) {
      const conexao = await conectar();
      const sql =
        "UPDATE material SET item = ?, qtd = ?, cpfUsuario = ? WHERE id = ?";
      const valores = [
        material.item,
        material.qtd,
        material.cpfUsuario,
        material.id,
      ];
      await conexao.query(sql, valores);
    }
  }

  async excluir(material) {
    if (material instanceof Material) {
      const conexao = await conectar();
      const sql = "DELETE FROM material WHERE id = ?";
      const valores = [material.id];
      await conexao.query(sql, valores);
    }
  }

  async consultar(termo) {
    const conexao = await conectar();
    const sql =
      "SELECT m.*, u.nome FROM material as m INNER JOIN usuario as u ON m.cpfUsuario = u.cpf WHERE nome LIKE ?";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    // global.poolConexoes.pool.releaseConnection(conexao);

    const listaDoacoes = [];
    for (const row of rows) {
      const usuario = new Usuario(row["cpfUsuario"], row["nome"]);
      const material = new Material(
        row["id"],
        row["item"],
        row["qtd"],
        row["cpfUsuario"],
        usuario
      );
      listaDoacoes.push(material);
    }
    return listaDoacoes;
  }
  
  // async consultar(termo) {
  //   const conexao = await conectar();
  //   const sql = "SELECT * FROM material WHERE cpfUsuario LIKE ?";
  //   const valores = ["%" + termo + "%"];
  //   const [rows] = await conexao.query(sql, valores);
  //   const listaDoacao = [];
  //   for (const row of rows) {
  //     const material = new Material(
  //       row["id"],
  //       row["item"],
  //       row["qtd"],
  //       row["cpfUsuario"]
  //     );
  //     listaDoacao.push(material);
  //   }
  //   return listaDoacao;
  // }
  async consultarCPF(cpf) {
    const conexao = await conectar();
    const sql = "SELECT * FROM material WHERE cpf = ?";
    const valores = [cpf];
    const [rows] = await conexao.query(sql, valores);
    const listaDoacao = [];
    for (const row of rows) {
      const material = new Material(
        row["id"],
        row["item"],
        row["qtd"],
        row["cpfUsuario"]
      );
      listaDoacao.push(material);
    }
    return listaDoacao;
  }
}
