import { DoacaoMaterialBD } from "../Persistencia/DoacaoMaterialBD.js";

// Dados que o usuario precisa informar para cadastro
export class DoacaoMaterial {
  #doacao;
  #material;
  #quantidade;
  

  constructor(doacao,material, quantidade) {
    this.doacao = doacao;
    this.material = material;
    this.quantidade = quantidade;
  }

  get doacao() {
    return this.#doacao;
  }

  set doacao(novodoacao) {
    this.#doacao = novodoacao;
  }

 

  get quantidade() {
    return this.#quantidade;
  }

  set quantidade(novoquantidade) {
    this.#quantidade = novoquantidade;
  }

  get material() {
    return this.#material;
  }

  set material(novomaterial) {
    this.#material = novomaterial;
  }

  toJSON() {
    return {
      doacao: this.#doacao?.toJSON(),      
      material: this.#material?.toJSON(),
      quantidade: this.#quantidade,
    };
  }

  async gravar() {
    const doacaoMaterialBD = new DoacaoMaterialBD();
    await doacaoMaterialBD.incluir(this);
  }

  async atualizar() {
    const doacaoMaterialBD = new DoacaoMaterialBD();
    await doacaoMaterialBD.alterar(this);
  }

  async removerDoBancoDados() {
    const doacaoMaterialBD = new DoacaoMaterialBD();
    await doacaoMaterialBD.excluir(this);
  }

 async consultar(termo) {
    const doacaoMaterialBD = new DoacaoMaterialBD();
    const doacaos = await doacaoMaterialBD.consultar(termo);
    return doacaos;
  }
}
