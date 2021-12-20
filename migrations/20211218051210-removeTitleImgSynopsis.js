'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.removeColumn("favAnimes", 'imageUrl', Sequelize.INTEGER)
     await queryInterface.removeColumn("favAnimes", 'synopsis', Sequelize.INTEGER)
     await queryInterface.removeColumn("favAnimes", 'title', Sequelize.INTEGER)

     await queryInterface.removeColumn("watcheds", 'imageUrl', Sequelize.INTEGER)
     await queryInterface.removeColumn("watcheds", 'synopsis', Sequelize.INTEGER)
     await queryInterface.removeColumn("watcheds", 'title', Sequelize.INTEGER)
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
