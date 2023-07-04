"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Pessoas", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Pessoas", "deleteAt");
  },
};
