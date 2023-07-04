"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Turmas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data_inicio: {
        type: Sequelize.DATEONLY,
      },
      docente_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Pessoas", key: "id" },
      },
      nivel_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Niveis", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Turmas");
  },
};
