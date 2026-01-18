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
    await queryInterface.createTable("orders", {
      order_id: {
        type: Sequelize.STRING,
      },
      order_amount: {
        type: Sequelize.INTEGER,
        field: "order_amount",
      },
      currency: {
        type: Sequelize.STRING,
      },
      payment_session_id: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("SUCCESS", "FAILED", "PENDING"),
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("orders");
  },
};
