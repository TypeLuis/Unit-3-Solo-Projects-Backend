'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn("favAnimes", 'imageUrl', Sequelize.INTEGER)
     await queryInterface.addColumn("favAnimes", 'synopsis', Sequelize.INTEGER)
     await queryInterface.addColumn("favAnimes", 'title', Sequelize.INTEGER)

     await queryInterface.addColumn("watcheds", 'imageUrl', Sequelize.INTEGER)
     await queryInterface.addColumn("watcheds", 'synopsis', Sequelize.INTEGER)
     await queryInterface.addColumn("watcheds", 'title', Sequelize.INTEGER)
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
