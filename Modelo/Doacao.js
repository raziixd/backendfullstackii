import { DoacaoBD } from "../Persistencia/DoacaoBD.js"

// Dados que o usuario precisa informar para cadastro
export class Doacao{

    #id;
    #itemDoado;
    #valorDoado;
    #nome;

    constructor(id, itemDoado, valorDoado, nome) {
        this.id = id;
        this.itemDoado = itemDoado;
        this.valorDoado = valorDoado;
        this.nome = nome;
    }

    get id(){
        return this.#id
    }

    set id(novoId) {
        this.#id = novoId;
    }
    
    get itemDoado(){
        return this.#itemDoado
    }
    
    set itemDoado(novoItemDoado) {
        this.#itemDoado = novoItemDoado;
    }
    
    get valorDoado(){
        return this.#valorDoado
    }
    
    set valorDoado(novoValorDoado) {
        this.#valorDoado = novoValorDoado;
    }
    
    get nome() {
        return this.#nome
    }
    
    set nome(novoNome){
        if(novoNome != "")
            this.#nome = novoNome;
    }

    toJSON(){
        return{
            "id"         :   this.#id,
            "itemDoado"  :   this.#itemDoado,
            "valorDoado" :   this.#valorDoado,
            "nome"       :   this.#nome,
            

        }
    }

    async gravar(){ 
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

    async consultarCPF(id) {
        const doacaoBD = new DoacaoBD();
        const doacaos = await doacaoBD.consultarCPF(id);
        return doacaos;

    }

}