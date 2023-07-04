const express = require("express");
const router = express.Router();
const MatriculasController = require("../controllers/Matricula.controller");

router.get(
  "/:id/estudante/:estudanteId",
  MatriculasController.listarMatriculas
);
router.get(
  "/matriculas/:turmaId/confirmados",
  MatriculasController.listarMatriculasPorTurmas
);
router.post("/estudante/:estudanteId", MatriculasController.criarMatriculas);
router.put(
  "/:id/estudante/:estudanteId",
  MatriculasController.atualizarMatriculas
);
router.post("/:id/restaurar", MatriculasController.restaurarMatriculas);

module.exports = router;
