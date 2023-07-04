const database = require("../models");

class Services {
  constructor(model) {
    this.model = model;
    this.database = database;
  }

  async findAll(where = {}) {
    return this.database[this.model].findAll({ where: { ...where } });
  }

  async findOne(where = {}) {
    return this.database[this.model].findOne({ where: { ...where } });
  }

  async create(data) {
    return this.database[this.model].create(data);
  }

  async update(data, where, transaction = {}) {
    return this.database[this.model].update(
      data,
      { where: { ...where } },
      transaction
    );
  }

  async destroy(where = {}) {
    return this.database[this.model].destroy({ where: { ...where } });
  }

  async restore(where = {}) {
    return this.database[this.model].restore({ where: { ...where } });
  }

  async findAndCountAll(where = {}, aggregations) {
    return this.database[this.model].findAndCountAll({
      where: { ...where },
      ...aggregations,
    });
  }
}

module.exports = Services;
