import { Router } from "express";
import {DoacaoCTRL} from "../Controle/DoacaoCTRL.js"


const rotaDoacao = new Router();
const doacaoCTRL = new DoacaoCTRL();



rotaDoacao.post('/', doacaoCTRL.gravar)
.put('/', doacaoCTRL.atualizar)
.delete('/', doacaoCTRL.excluir)
.get('/', doacaoCTRL.consultar)
.get('/:cpf', doacaoCTRL.consultarPeloCPF)

export default rotaDoacao;