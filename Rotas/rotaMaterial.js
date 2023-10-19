import { Router } from "express";
import { MaterialCTRL } from "../Controle/MaterialCTRL.js";

const rotaMaterial = new Router();
const materialCTRL = new MaterialCTRL();

rotaMaterial
  .post("/", materialCTRL.gravar)
  .put("/", materialCTRL.atualizar)
  .delete("/", materialCTRL.excluir)
  .get("/", materialCTRL.consultar)

export default rotaMaterial;
