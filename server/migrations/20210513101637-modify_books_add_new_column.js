"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("Books", "materialType", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Books", "isAvailable", {
      type: Sequelize.TINYINT,
      allowNull: false,
    });
    await queryInterface.addColumn("Books", "isReservation", {
      type: Sequelize.TINYINT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn("Books", "materialType"),
      queryInterface.removeColumn("Books", "isAvailable"),
      queryInterface.removeColumn("Books", "isReservation");
  },
};

/* 
  materialType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reservationState: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },

*/
