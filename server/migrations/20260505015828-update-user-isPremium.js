"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
      UPDATE Users
      SET is_premium =
        CASE
          WHEN is_premium = 'true' THEN 1
          WHEN is_premium = 'false' THEN 0
          ELSE 0
        END;
    `);

    await queryInterface.changeColumn("users", "is_premium", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("users", "is_premium", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
    });
  },
};
