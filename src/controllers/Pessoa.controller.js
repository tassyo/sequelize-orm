const { PessoasServices } = require("../services");
const personServices = new PessoasServices();

class PessoaController {
  //https://linuxize.com/post/curl-rest-api/#http-get

  /**
   * curl http://localhost:3000/pessoas/
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async listarPessoas(req, res) {
    try {
      const pessoas = await personServices.findAllActives();
      return res.status(200).json({ data: pessoas, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  /**
   * curl http://localhost:3000/pessoas/
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async listarPessoasAtivas(req, res) {
    try {
      const pessoas = await personServices.findAll();
      return res.status(200).json({ data: pessoas, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  /**
   * curl -X POST -H "Content-Type: application/json" \
   *     -d '{"id": 1, "nome": "Tassyo", "ativo": true, "email":"tassyo@mail.com", "role":"ADMIN"}' \
   *     http://localhost:3000/pessoas/
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async criarPessoas(req, res) {
    try {
      const pessoa = req.body;
      const data = await personServices.create(pessoa);
      return res.status(200).json({ data: data, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  /**
   * curl http://localhost:3000/pessoas/1
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async buscarPessoas(req, res) {
    try {
      const { id } = req.params;
      const pessoa = await personServices.findOne({ id: id });
      return res.status(200).json({ data: pessoa, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  /**
   * curl -X DELETE http://localhost:3000/pessoas/1
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async deletarPessoas(req, res) {
    try {
      const { id } = req.params;
      const data = await personServices.destroy({ id: id });
      return res.status(200).json({ data: data, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  static async atualizarPessoas(req, res) {
    try {
      const pessoa = req.body;
      const { id } = req.params;

      const data = await personServices.update(pessoa, { id: id });
      return res.status(200).json({ data: data, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  /**
   * curl -X POST -H "Content-Type: application/json" \
   *     -d '{"id": 1, "nome": "Tassyo", "ativo": true, "email":"tassyo@mail.com", "role":"ADMIN"}' \
   *     http://localhost:3000/pessoas/
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async restaurarPessoas(req, res) {
    try {
      const { id } = req.params;

      const data = await personServices.restore({
        id: Number(id),
      });
      return res.status(200).json({ data: data, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  static async buscarMatriculas(req, res) {
    try {
      const { estudanteId } = req.params;

      const pessoa = await personServices.findOne({
        estudante_id: Number(estudanteId),
      });

      const data = await pessoa.getAulasMatriculadas();
      return res.status(200).json({ data: data, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  static async cancelarPessoas(req, res) {
    try {
      const { id } = req.params;
      await personServices.cancelaPessoaMatriculas(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }
}

module.exports = PessoaController;
