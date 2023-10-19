import { Material } from "../Modelo/Material.js";
import conectar from "./Conexao.js";
import  { Usuario } from "../Modelo/Usuario.js";
import { Doacao } from "../Modelo/Doacao.js";
export class MaterialBD {
  async incluir(material) {
    if (material instanceof Material) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO material (item) VALUES (?)";
      const valores = [ material.item];
      await conexao.query(sql, valores);
    }
  }

  async alterar(material) {
    if (material instanceof Material) {
      const conexao = await conectar();
      const sql =
        "UPDATE material SET item = ? WHERE id = ?";
      const valores = [
        material.item,
        material.id
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
      FROM material 
      WHERE item LIKE ?
      `
  
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);

    const listaMaterial = [];
    for (const row of rows) {
      const material = new Material(
        row["id"],
        row["item"],
      );
      listaMaterial.push(material);
    }
    return listaMaterial;
  }
  async consultarId(id) {
    const conexao = await conectar();
    const sql =
    `SELECT *       
      FROM material 
      WHERE id = ?
      `
  
    const valores = [  id  ];
    const [rows] = await conexao.query(sql, valores);

    for (const row of rows) {
      const material = new Material(
        row["id"],
        row["item"],
      );
      return material
    }
  }
  async consultar(termo) {
    const conexao = await conectar();
    const sql =
    `SELECT *       
      FROM material 
      WHERE item LIKE ?
      `
  
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);

    const listaMaterial = [];
    for (const row of rows) {
      const material = new Material(
        row["id"],
        row["item"],
      );
      listaMaterial.push(material);
    }
    return listaMaterial;
  }
}
