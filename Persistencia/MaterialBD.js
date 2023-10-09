import { Material } from "../Modelo/Material.js";
import conectar from "./Conexao.js";
import  { Usuario } from "../Modelo/Usuario.js";
import { Doacao } from "../Modelo/Doacao.js";
export class MaterialBD {
  async incluir(material) {
    if (material instanceof Material) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO material (id_doacao, item, qtd, cpfUsuario) VALUES (?,?,?,?)";
      const valores = [material.id_doacao, material.item, material.qtd, material.cpfUsuario];
      await conexao.query(sql, valores);
    }
  }

  async alterar(material) {
    if (material instanceof Material) {
      const conexao = await conectar();
      const sql =
        "UPDATE material SET id_doacao = ?, item = ?, qtd = ?, cpfUsuario = ? WHERE id = ?";
      const valores = [
        material.id_doacao,
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
    `SELECT *       
      FROM doacao as d 
      INNER JOIN usuario as u ON d.cpfUsuario = u.cpf 
      INNER JOIN material as m ON d.id = m.id_doacao
      WHERE nome LIKE ?
      `
  //   SELECT
  //     m.id AS id,
  //     d.ItemDoado AS item,
  //     d.id as id_doacao,
  //     m.qtd,
  //     u.cpf AS cpfUsuario
      
  //   FROM doacao d
  //   INNER JOIN usuario u ON d.cpfUsuario = u.cpf
  //   INNER JOIN material m ON d.id = m.id_doacao
  // `
  
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    // global.poolConexoes.pool.releaseConnection(conexao);

    const listaMaterial = [];
    for (const row of rows) {
      const doacao = new Doacao(row["id_doacao"])
      const usuario = new Usuario(row["cpfUsuario"], row["nome"]);
      const material = new Material(
      
        row["id"],
        row["id_doacao"],
        row["item"],
        row["qtd"],
        row["cpfUsuario"],
        usuario
      );
      listaMaterial.push(material);
    }
    return listaMaterial;
  }
  
  // async consultar(termo) {
  //   const conexao = await conectar();
  //   const sql = "SELECT * FROM material WHERE cpfUsuario LIKE ?";
  //   const valores = ["%" + termo + "%"];
  //   const [rows] = await conexao.query(sql, valores);
  //   const listaMaterial = [];
  //   for (const row of rows) {
  //     const material = new Material(
  //       row["id"],
  //       row["item"],
  //       row["qtd"],
  //       row["cpfUsuario"]
  //     );
  //     listaMaterial.push(material);
  //   }
  //   return listaMaterial;
  // }
  async consultarCPF(cpf) {
    const conexao = await conectar();
    const sql = "SELECT * FROM material WHERE cpf = ?";
    const valores = [cpf];
    const [rows] = await conexao.query(sql, valores);
    const listaMaterial = [];
    for (const row of rows) {
      const material = new Material(
        row["id"],
        row["id_doacao"],
        row["item"],
        row["qtd"],
        row["cpfUsuario"]
      );
      listaMaterial.push(material);
    }
    return listaMaterial;
  }
}
