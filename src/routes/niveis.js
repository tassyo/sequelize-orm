const express = require("express");
const router = express.Router();
const NiveisController = require("../controllers/Nivel.controller");
const PessoasController = require("../controllers/Pessoa.controller");

router.get("/", NiveisController.listarNiveis);
router.get("/:id", NiveisController.buscarNiveis);
router.delete("/:id", NiveisController.deletarNiveis);
router.post("/", NiveisController.criarNiveis);
router.put("/:id", NiveisController.atualizarNiveis);
router.post("/:id/restaurar", NiveisController.restaurarNiveis);

module.exports = router;
