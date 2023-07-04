'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Niveis', [
      {
        descricao_nivel:'Basico',
      },
      {
        descricao_nivel:'Intermediário',
      },
      {
        descricao_nivel:'Avançado',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Niveis',null,{})
  }
};
