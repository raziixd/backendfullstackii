import { Doacao } from "../Modelo/Doacao.js";
import conectar from "./Conexao.js";
import  { Usuario } from "../Modelo/Usuario.js";
export class DoacaoBD {
  async incluir(doacao) {
    if (doacao instanceof Doacao) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO doacao (itemDoado, valorDoado, cpfUsuario) VALUES (?,?,?)";
      const valores = [doacao.itemDoado, doacao.valorDoado, doacao.cpfUsuario];
      await conexao.query(sql, valores);
    }
  }

  async alterar(doacao) {
    if (doacao instanceof Doacao) {
      const conexao = await conectar();
      const sql =
        "UPDATE doacao SET itemDoado = ?, valorDoado = ?, cpfUsuario = ? WHERE id = ?";
      const valores = [
        doacao.itemDoado,
        doacao.valorDoado,
        doacao.cpfUsuario,
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
      "SELECT d.*, u.nome FROM doacao as d INNER JOIN usuario as u ON d.cpfUsuario = u.cpf WHERE nome LIKE ?";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    // global.poolConexoes.pool.releaseConnection(conexao);

    const listaDoacoes = [];
    for (const row of rows) {
      const usuario = new Usuario(row["cpfUsuario"], row["nome"]);
      const doacao = new Doacao(
        row["id"],
        row["itemDoado"],
        row["valorDoado"],
        row["cpfUsuario"],
        row["nome"],
        usuario
      );
      listaDoacoes.push(doacao);
    }
    return listaDoacoes;
  }
  
  // async consultar(termo) {
  //   const conexao = await conectar();
  //   const sql = "SELECT * FROM doacao WHERE cpfUsuario LIKE ?";
  //   const valores = ["%" + termo + "%"];
  //   const [rows] = await conexao.query(sql, valores);
  //   const listaDoacao = [];
  //   for (const row of rows) {
  //     const doacao = new Doacao(
  //       row["id"],
  //       row["itemDoado"],
  //       row["valorDoado"],
  //       row["cpfUsuario"]
  //     );
  //     listaDoacao.push(doacao);
  //   }
  //   return listaDoacao;
  // }
  async consultarCPF(cpf) {
    const conexao = await conectar();
    const sql = "SELECT * FROM doacao WHERE cpf = ?";
    const valores = [cpf];
    const [rows] = await conexao.query(sql, valores);
    const listaDoacao = [];
    for (const row of rows) {
      const doacao = new Doacao(
        row["id"],
        row["itemDoado"],
        row["valorDoado"],
        row["cpfUsuario"]
      );
      listaDoacao.push(doacao);
    }
    return listaDoacao;
  }
}
