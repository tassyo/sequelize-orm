const { Sequelize } = require("sequelize");
const { MatriculasServices } = require("../services");
const matriculasServices = new MatriculasServices();

class MatriculaController {
  //https://linuxize.com/post/curl-rest-api/#http-get

  static async listarMatriculas2(req, res) {
    const { data_inicio, data_fim } = req.query;
    const where = {};
    data_inicio || data_fim ? (where.createdAt = {}) : null;
    data_inicio ? (where.createdAt[Op.gte] = data_inicio) : null;
    data_fim ? (where.createdAt[Op.lte] = data_fim) : null;

    try {
      const matriculas = await matriculasServices.findAll({ where });
      return res.status(200).json({ data: matriculas, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  /**
   * curl http://localhost:3000/matriculas/
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async listarMatriculas(req, res) {
    const { estudanteId, id } = req.params;
    try {
      const matriculas = await matriculasServices.findOne({
        id: Number(id),
        estudante_id: estudanteId,
      });
      return res.status(200).json({ data: matriculas, success: true });
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
  static async criarMatriculas(req, res) {
    try {
      const { estudanteId } = req.params;
      const matricula = { ...req.body, estudante_id: Number(estudanteId) };
      const data = await matriculasServices.create(matricula);
      return res.status(200).json({ data: data, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  static async atualizarMatriculas(req, res) {
    try {
      const matricula = req.body;
      const { id, estudanteId } = req.params;

      await matriculasServices.update(matricula, {
        id: id,
        estudante_id: estudanteId,
      });

      const data = await matriculasServices.findOne({ id: Number(id) });
      return res.status(200).json({ data: data, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  static async restaurarMatriculas(req, res) {
    try {
      const { id } = req.params;

      const data = await matriculasServices.restore({
        id: Number(id),
      });
      return res.status(200).json({ data: data, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  /**
   * curl http://localhost:3000/matriculas/1/confirmados
   * @param req
   * @param res
   * @returns {Promise<*>}
   */

  static async listarMatriculasPorTurmas(req, res) {
    const { turmaId } = req.params;

    try {
      const matriculas = await matriculasServices.findAndCountAll(
        {
          turma_id: Number(turmaId),
          status: "confirmado",
        },
        {
          limit: 20,
          order: [["estudante_id", "ASC"]],
        }
      );
      return res.status(200).json({ data: matriculas, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }

  static async listarTurmasLotadas(req, res) {
    const lotacaoTurma = 2;

    try {
      const matriculas = await matriculasServices.findAndCountAll(
        {
          status: "confirmado",
        },
        {
          attributes: ["turma_id"],
          group: ["turma_id"],
          having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`),
        }
      );

      return res.status(200).json({ data: matriculas.count, success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  }
}

module.exports = MatriculaController;
