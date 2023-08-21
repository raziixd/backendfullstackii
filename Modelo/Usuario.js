import { UsuarioBD } from "../Persistencia/UsuarioBD.js"

// Dados que o usuario precisa informar para cadastro
export class Usuario{

    #cpf;
    #nome;
    #dataNasc;
    #email;
    #tel;
    #sexo;
    #cidade;    
    #uf;
    #treinador;
    #jogador;


    constructor(cpf, nome, dataNasc, email, tel, sexo, cidade, uf, treinador, jogador) {
        this.cpf = cpf;
        this.nome = nome;
        this.dataNasc = dataNasc;
        this.email = email;
        this.tel = tel;
        this.sexo = sexo;
        this.cidade = cidade;
        this.uf = uf;
        this.treinador = treinador;
        this.jogador = jogador;
    }

    get cpf(){
        return this.#cpf
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }
    get nome() {
        return this.#nome
    }
    
    set nome(novoNome){
        if(novoNome != "")
            this.#nome = novoNome;
    }

    get dataNasc(){
        return this.#dataNasc
    }

    set dataNasc(novaDataNasc) {
        this.#dataNasc = novaDataNasc;
    }

    get email(){
        return this.#email
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }


    get tel(){
        return this.#tel
    }

    set tel(novoTel) {
        this.#tel = novoTel;
    }

    get sexo(){
        return this.#sexo
    }

    set sexo(novoSexo) {
        this.#sexo = novoSexo;
    }

get cidade(){
    return this.#cidade;
}

set cidade(novaCidade){
    this.#cidade = novaCidade;
}

get uf(){
    return this.#uf;
}

set uf(novaUF){
    this.#uf = novaUF;
}

get treinador(){
    return this.#treinador;
}

set treinador(novoTreinador){
    this.#treinador = novoTreinador;
}

get jogador(){
    return this.#jogador;
}

set jogador(novoJogador){
    this.#jogador = novoJogador;
}


    toJSON(){
        return{
            "cpf"       :   this.#cpf,
            "nome"      :   this.#nome,
            "dataNasc"  :   this.#dataNasc,
            "email"     :   this.#email,
            "tel"       :   this.#tel,
            "sexo"      :   this.#sexo,
            "cidade"    :   this.#cidade,
            "uf"        :   this.#uf,
            "treinador" :   this.#treinador,
            "jogador"   :   this.#jogador

        }
    }

    async gravar(){ 
        const usuarioBD = new UsuarioBD();
        await usuarioBD.incluir(this);

    }

    async atualizar() {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.alterar(this);
    }

    async removerDoBancoDados() {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.excluir(this);
    }

    async consultar(termo) {
        const usuarioBD = new UsuarioBD();
        const usuarios = await usuarioBD.consultar(termo);
        return usuarios;

    }

    async consultarCPF(cpf) {
        const usuarioBD = new UsuarioBD();
        const usuarios = await usuarioBD.consultarCPF(cpf);
        return usuarios;

    }

}