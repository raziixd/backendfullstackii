import { Router } from "express";
import { DoacaoCTRL } from "../Controle/DoacaoCTRL.js";

const rotaDoacao = new Router();
const doacaoCTRL = new DoacaoCTRL();

rotaDoacao
  .post("/", doacaoCTRL.gravar)
  .put("/", doacaoCTRL.atualizar)
  .delete("/", doacaoCTRL.excluir)
  .get("/", doacaoCTRL.consultar)

export default rotaDoacao;
