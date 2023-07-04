const { NiveisServices } = require("../services");
const niveisServices = new NiveisServices();

class NivelController {
  //https://linuxize.com/post/curl-rest-api/#http-get

  /**
   * curl http://localhost:3000/niveis/
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async listarNiveis(req, res) {
    try {
      const niveis = await niveisServices.findAll();
      return res.status(200).json({ data: niveis, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  /**
   * curl -X POST -H "Content-Type: application/json" \
   *     -d '{"id": 1, "nome": "Tassyo", "ativo": true, "email":"tassyo@mail.com", "role":"ADMIN"}' \
   *     http://localhost:3000/niveis/
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async criarNiveis(req, res) {
    try {
      const nivel = req.body;
      const data = await niveisServices.create(nivel);
      return res.status(200).json({ data: data, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  /**
   * curl http://localhost:3000/niveis/1
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async buscarNiveis(req, res) {
    try {
      const { id } = req.params;
      const nivel = await niveisServices.findOne({ id: id });
      return res.status(200).json({ data: nivel, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  /**
   * curl -X DELETE http://localhost:3000/niveis/1
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async deletarNiveis(req, res) {
    try {
      const { id } = req.params;
      const data = await niveisServices.destroy({ id: id });
      return res.status(200).json({ data: data, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  static async atualizarNiveis(req, res) {
    try {
      const nivel = req.body;
      const { id } = req.params;

      const data = await niveisServices.update(nivel, { id: id });
      return res.status(200).json({ data: data, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  static async restaurarNiveis(req, res) {
    try {
      const { id } = req.params;

      const data = await niveisServices.restore({ id: Number(id) });
      return res.status(200).json({ data: data, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }
}

module.exports = NivelController;
