'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Turmas', [
      {
        data_inicio:'2022-01-01',
        nivel_id:1,
        docente_id:2
      },
      {
        data_inicio:'2022-03-01',
        nivel_id:2,
        docente_id:4
      },
      {
        data_inicio:'2022-04-01',
        nivel_id:3,
        docente_id:1
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Turmas',null,{})
  }
};
