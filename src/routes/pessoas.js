const express = require('express');
const router = express.Router();
const PessoasController = require("../controllers/Pessoa.controller");

router.get('/',PessoasController.listarPessoasAtivas)
router.get('/all',PessoasController.listarPessoas)
router.get('/:id',PessoasController.buscarPessoas)
router.delete('/:id',PessoasController.deletarPessoas)
router.post('/',PessoasController.criarPessoas)
router.put('/:id',PessoasController.atualizarPessoas)
router.post('/:id/restaurar',PessoasController.restaurarPessoas)
router.post('/:id/cancelar',PessoasController.cancelarPessoas)

module.exports = router;
