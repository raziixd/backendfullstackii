import { Router } from "express";
import { DoacaoMaterialCTRL } from "../Controle/DoacaoMaterialCTRL.js";

const rotaDoacaoMaterial = new Router();
const doacaoMaterialCTRL = new DoacaoMaterialCTRL();

rotaDoacaoMaterial
  .post("/", doacaoMaterialCTRL.gravar)
  .put("/", doacaoMaterialCTRL.atualizar)
  .delete("/", doacaoMaterialCTRL.excluir)
  .get("/", doacaoMaterialCTRL.consultar)
 
export default rotaDoacaoMaterial;
