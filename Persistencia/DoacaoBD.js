import { Doacao } from "../Modelo/Doacao.js";
import conectar from "./Conexao.js";
import  { Usuario } from "../Modelo/Usuario.js";
export class DoacaoBD {
  async incluir(doacao) {
    if (doacao instanceof Doacao) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO doacao (valorDoado, cpfUsuario) VALUES (?,?)";
      const valores = [doacao.valorDoado, doacao.usuario.cpf];
      await conexao.query(sql, valores);
    }
  }

  async alterar(doacao) {
    if (doacao instanceof Doacao) {
      const conexao = await conectar();
      const sql =
        "UPDATE doacao SET valorDoado = ?, cpfUsuario = ? WHERE id = ?";
      const valores = [
        doacao.valorDoado,
        doacao.usuario.cpf,
        doacao.id,
      ];
      await conexao.query(sql, valores);
    }
  }

  async excluir(doacao) {
    if (doacao instanceof Doacao) {
      const conexao = await conectar();
      const sql = "DELETE FROM doacao WHERE id = ?";
      const valores = [doacao.id];
      await conexao.query(sql, valores);
    }
  }

  async consultar(termo) {
    const conexao = await conectar();
    const sql =
      "SELECT u.*, d.id as dId, d.valorDoado FROM doacao as d INNER JOIN usuario as u ON d.cpfUsuario = u.cpf WHERE u.nome LIKE ?";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);

    const listaDoacoes = [];
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
      listaDoacoes.push(doacao);
    }
    return listaDoacoes;
  }
  async consultarId(termo) {
    const conexao = await conectar();
    const sql =
      "SELECT u.*, d.id as dId, d.valorDoado FROM doacao as d INNER JOIN usuario as u ON d.cpfUsuario = u.cpf WHERE d.id = ?";
    const valores = [termo];
    const [rows] = await conexao.query(sql, valores);

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
      return doacao;    
    }
  }
}
