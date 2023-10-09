import { MaterialBD } from "../Persistencia/MaterialBD.js";

// Dados que o usuario precisa informar para cadastro
export class Material {
  #id;
  #id_doacao;
  #item;
  #qtd;
  #cpfUsuario;

  constructor(id, id_doacao, item, qtd, cpfUsuario) {
    this.id = id;
    this.id_doacao = id_doacao;
    this.item = item;
    this.qtd = qtd;
    this.cpfUsuario = cpfUsuario;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
  }
  get id_doacao() {
    return this.#id_doacao;
  }

  set id_doacao(novoid_doacao) {
    this.#id_doacao = novoid_doacao;
  }

  get item() {
    return this.#item;
  }

  set item(novoItem) {
    this.#item = novoItem;
  }

  get qtd() {
    return this.#qtd;
  }

  set qtd(novaQtd) {
    this.#qtd = novaQtd;
  }

  get cpfUsuario() {
    return this.#cpfUsuario;
  }

  set cpfUsuario(novoCpfUsuario) {
    if (novoCpfUsuario != "") this.#cpfUsuario = novoCpfUsuario;
  }

  toJSON() {
    return {
      id: this.#id,
      id_doacao: this.#id_doacao,
      item: this.#item,
      qtd: this.#qtd,
      cpfUsuario: this.#cpfUsuario,
    };
  }

  async gravar() {
    const doacaoBD = new MaterialBD();
    await doacaoBD.incluir(this);
  }

  async atualizar() {
    const doacaoBD = new MaterialBD();
    await doacaoBD.alterar(this);
  }

  async removerDoBancoDados() {
    const doacaoBD = new MaterialBD();
    await doacaoBD.excluir(this);
  }

  async consultar(termo) {
    const doacaoBD = new MaterialBD();
    const doacaos = await doacaoBD.consultar(termo);
    return doacaos;
  }

  async consultarCPF(id) {
    const doacaoBD = new MaterialBD();
    const doacaos = await doacaoBD.consultarCPF(id);
    return doacaos;
  }
}
