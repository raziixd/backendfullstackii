import { DoacaoBD } from "../Persistencia/DoacaoBD.js";

// Dados que o usuario precisa informar para cadastro
export class Doacao {
  #id;
  #valorDoado;
  #usuario;
  

  constructor(id, valorDoado, usuario) {
    this.id = id;
    this.valorDoado = valorDoado;
    this.usuario = usuario;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
  }

 

  get valorDoado() {
    return this.#valorDoado;
  }

  set valorDoado(novoValorDoado) {
    this.#valorDoado = novoValorDoado;
  }

  get usuario() {
    return this.#usuario;
  }

  set usuario(novoUsuario) {
    this.#usuario = novoUsuario;
  }

  toJSON() {
    return {
      id: this.#id,      
      valorDoado: this.#valorDoado,
      usuario: this.#usuario?.toJSON(),
    };
  }

  async gravar() {
    const doacaoBD = new DoacaoBD();
    await doacaoBD.incluir(this);
  }

  async atualizar() {
    const doacaoBD = new DoacaoBD();
    await doacaoBD.alterar(this);
  }

  async removerDoBancoDados() {
    const doacaoBD = new DoacaoBD();
    await doacaoBD.excluir(this);
  }

   async consultar(termo) {
    const doacaoBD = new DoacaoBD();
    const doacaos = await doacaoBD.consultar(termo);
    return doacaos;
  }

   async consultarId(cpf) {
    const doacaoBD = new DoacaoBD();
    const doacaos = await doacaoBD.consultarId(cpf);
    return doacaos;
  }
}
