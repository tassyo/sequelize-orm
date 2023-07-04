const Services = require("./Services");

class PessoaServices extends Services {
  constructor() {
    super("Pessoas");
    this.matriculas = new Services("Matriculas");
  }
  findAll(where = {}) {
    return this.database[this.model].findAll({ where: { ...where } });
  }
  findAllActives(where = {}) {
    return this.database[this.model]
      .scope("all")
      .findAll({ where: { ...where } });
  }
  async cancelaPessoaMatriculas(id) {
    return this.database.sequelize.transaction(async (transaction) => {
      await super.update(
        { ativo: false },
        { id: Number(id) } ,
        { transaction: transaction }
      );
      await this.matriculas.update(
        { status: "cancelado" },
        { estudante_id: Number(id) } ,
        { transaction: transaction }
      );
    });
  }
}
module.exports = PessoaServices;
