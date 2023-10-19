import conectar from "./Conexao.js";
import  { Usuario } from "../Modelo/Usuario.js";
import  { Material } from "../Modelo/Material.js";
import  { Doacao } from "../Modelo/Doacao.js";
import  { DoacaoMaterial } from "../Modelo/DoacaoMaterial.js";

export class DoacaoMaterialBD {
  async incluir(doacaoMaterial) {
    if (doacaoMaterial instanceof DoacaoMaterial) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO doacao_material (doacao_id, material_id, quantidade) VALUES (?,?,?)";
      const valores = [
        doacaoMaterial.doacao.id, 
        doacaoMaterial.material.id, 
        doacaoMaterial.quantidade
      ];
      await conexao.query(sql, valores);
    }
  }

  async alterar(doacaoMaterial) {
    if (doacaoMaterial instanceof DoacaoMaterial) {
      const conexao = await conectar();
      const sql =
        "UPDATE doacao_material SET quantidade = ? WHERE doacao_id = ? AND material_id = ? ";
      const valores = [
        doacaoMaterial.quantidade,
        doacaoMaterial.doacao.id, 
        doacaoMaterial.material.id
      ];
      await conexao.query(sql, valores);
    }
  }

  async excluir(doacaoMaterial) {
    if (doacaoMaterial instanceof DoacaoMaterial) {
      const conexao = await conectar();
      const sql = "DELETE FROM doacao_material WHERE doacao_id = ? AND material_id = ?";
      const valores = [
        doacaoMaterial.doacao.id, 
        doacaoMaterial.material.id
      ];
      await conexao.query(sql, valores);
    }
  }

  async consultar() {
    const conexao = await conectar();
    const sql =
      "SELECT u.*, d.id as dId, d.valorDoado, m.id as mId, m.item as mItem, dm.quantidade as dmQuantidade FROM doacao_material dm INNER JOIN doacao d on dm.doacao_id = d.id INNER JOIN material m on dm.material_id = m.id INNER JOIN usuario u on u.cpf = d.cpfUsuario ";

    const [rows] = await conexao.query(sql);
 
    const listaDoacaoMaterias = [];
    for (const row of rows) {
      const usuario = new Usuario(
        row["cpf"],
        row["nome"],
        row["dataNasc"],
        row["email"],
        row["tel"],
        row["sexo"],
        row["cidade"],
        row["uf"],
        row["treinador"],
        row["jogador"]
      );
      const doacao = new Doacao(
        row["dId"],
        row["valorDoado"],
        usuario
      );      
      const material = new Material(row["mId"], row["mItem"]);

      const doacaoMaterial = new DoacaoMaterial(
        doacao,
        material,
        row["dmQuantidade"],
      );
      listaDoacaoMaterias.push(doacaoMaterial);
    }
    return listaDoacaoMaterias;
  }
  async consultarPorDoacaoId(doacao_id) {
    const conexao = await conectar();
    const sql =
      "SELECT u.*, d.id as dId, d.valorDoado, m.id as mId, m.item as mItem, dm.quantidade as dmQuantidade FROM doacao_material dm INNER JOIN doacao d on dm.doacao_id = d.id INNER JOIN material m on dm.material_id = m.id INNER JOIN usuario u on u.cpf = d.cpfUsuario WHERE dm.doacao_id = ? ";
    const valores = [
      doacao_id,
    ];
    const [rows] = await conexao.query(sql, valores);
 
    const listaDoacaoMaterias = [];
    for (const row of rows) {
      const usuario = new Usuario(
        row["cpf"],
        row["nome"],
        row["dataNasc"],
        row["email"],
        row["tel"],
        row["sexo"],
        row["cidade"],
        row["uf"],
        row["treinador"],
        row["jogador"]
      );
      const doacao = new Doacao(
        row["dId"],
        row["valorDoado"],
        usuario
      );      
      const material = new Material(row["mId"], row["mItem"]);

      const doacaoMaterial = new DoacaoMaterial(
        doacao,
        material,
        row["dmQuantidade"],
      );
      listaDoacaoMaterias.push(doacaoMaterial);
    }
    return listaDoacaoMaterias;
  }
  
  async consultarCPF(cpf) {
    const conexao = await conectar();
    const sql =
      "SELECT u.*, d.id as dId, d.dValorDoado, m.id as mId, m.item as mItem, dm.quantidade as dmQuantidade FROM doacao_material dm INNER JOIN doacao d on dm.doacao_id = d.id INNER JOIN material m on dm.material_id = m.id INNER JOIN usuario u on d.cpfUsuario = u.cpf WHERE u.cpf = ? ";
    const valores = [
      cpf
    ];
    const [rows] = await conexao.query(sql, valores);
 
    const listaDoacaoMaterias = [];
    for (const row of rows) {
      const usuario = new Usuario(
        row["cpf"],
        row["nome"],
        row["dataNasc"],
        row["email"],
        row["tel"],
        row["sexo"],
        row["cidade"],
        row["uf"],
        row["treinador"],
        row["jogador"]
      );
      const doacao = new Doacao(
        row["dId"],
        row["dValorDoado"],
        usuario
      );      
      const material = new Material(row["vId"], row["vItem"]);

      const doacaoMaterial = new DoacaoMaterial(
        doacao,
        material,
        row["dmQuantidade"],
      );
      listaDoacaoMaterias.push(doacaoMaterial);
    }
    return listaDoacaoMaterias;
  }
}
