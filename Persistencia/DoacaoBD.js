import {Doacao} from '../Modelo/Doacao.js';
import conectar from './Conexao.js';
export class DoacaoBD{

    async incluir(doacao){
        if (doacao instanceof Doacao){
            const conexao = await conectar();
            const sql = "INSERT INTO doacao (id, itemDoado, valorDoado, nome) VALUES (?,?,?,?)"
            const valores = [doacao.id, doacao.itemDoado, doacao.valorDoado, doacao.nome]
            await conexao.query(sql,valores)
        }

    }

    async alterar(doacao){

        if (doacao instanceof Doacao){
            const conexao = await conectar();
            const sql = "UPDATE doacao SET itemDoado = ?, valorDoado = ?, nome = ? WHERE id = ?";
            const valores = [doacao.itemDoado, doacao.valorDoado, doacao.nome, doacao.id]
            await conexao.query(sql,valores)
        }

    }

    async excluir(doacao){

        if (doacao instanceof Doacao){
            const conexao = await conectar();
            const sql = "DELETE FROM doacao WHERE id = ?";
            const valores = [doacao.id];
            await conexao.query(sql,valores)
        }

    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM doacao WHERE nome LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql,valores);
        const listaDoacao = [];
        for (const row of rows){
            const doacao = new Doacao(row['id'],row['itemDoado'],row['valorDoado'],row['nome']);
            listaDoacao.push(doacao);
        }
        return listaDoacao;



    }
    async consultarCPF(cpf){

        const conexao = await conectar();
        const sql = "SELECT * FROM doacao WHERE cpf = ?";
        const valores = [cpf]
        const [rows] = await conexao.query(sql,valores);
        const listaDoacao = [];
        for (const row of rows){
            const doacao = new Doacao(row['id'],row['itemDoado'],row['valorDoado'],row['nome']);
            listaDoacao.push(doacao);
        }
        return listaDoacao;
    }
}
