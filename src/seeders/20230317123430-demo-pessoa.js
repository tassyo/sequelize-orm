"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pessoas",
      [
        {
          nome: "Tassyo",
          ativo: true,
          email: "tassyo@mail.com",
          role: "analista",
        },
        {
          nome: "Antonio",
          ativo: true,
          email: "antonio@mail.com",
          role: "analista",
        },
        {
          nome: "Gaia",
          ativo: true,
          email: "gaia@mail.com",
          role: "analista",
        },
        {
          nome: "Costa",
          ativo: true,
          email: "costa@mail.com",
          role: "analista",
        },
        {
          nome: "Monteiro",
          ativo: true,
          email: "monteiro@mail.com",
          role: "analista",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Pessoas", null, {});
  },
};
