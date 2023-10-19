import { MaterialBD } from "../Persistencia/MaterialBD.js";

// Dados que o usuario precisa informar para cadastro
export class Material {
  #id;
  #item;

  constructor(id, item) {
    this.id = id;
    this.item = item;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
  }


  get item() {
    return this.#item;
  }

  set item(novoItem) {
    this.#item = novoItem;
  }

  toJSON() {
    return {
      id: this.#id,
      item: this.#item,
    };
  }

  async gravar() {
    const materialBD = new MaterialBD();
    await materialBD.incluir(this);
  }

  async atualizar() {
    const materialBD = new MaterialBD();
    await materialBD.alterar(this);
  }

  async removerDoBancoDados() {
    const materialBD = new MaterialBD();
    await materialBD.excluir(this);
  }

   async consultar(termo) {
    const materialBD = new MaterialBD();
    const doacaos = await materialBD.consultar(termo);
    return doacaos;
  }
   async consultarId(id) {
    const materialBD = new MaterialBD();
    const doacaos = await materialBD.consultarId(id);
    return doacaos;
  }
}
