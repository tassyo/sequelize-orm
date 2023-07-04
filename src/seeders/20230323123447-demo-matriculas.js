'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Matriculas', [
      {
        status:'ativo',
        estudante_id:1,
        turma_id:2
      },
      {
        status:'cancelado',
        estudante_id:2,
        turma_id:1
      },
      {
        status:'aguardando',
        estudante_id:3,
        turma_id:2
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Matriculas',null,{})
  }
};
