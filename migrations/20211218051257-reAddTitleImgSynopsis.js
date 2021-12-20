'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.addColumn("favAnimes", 'imageUrl', Sequelize.STRING)
     await queryInterface.addColumn("favAnimes", 'synopsis', Sequelize.STRING)
     await queryInterface.addColumn("favAnimes", 'title', Sequelize.STRING)

     await queryInterface.addColumn("watcheds", 'imageUrl', Sequelize.STRING)
     await queryInterface.addColumn("watcheds", 'synopsis', Sequelize.STRING)
     await queryInterface.addColumn("watcheds", 'title', Sequelize.STRING)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
