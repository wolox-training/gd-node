'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('qualifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rating_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      weet_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      score: {
        type: Sequelize.ENUM,
        values: [1, -1],
        allowNull: false
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('qualifications');
  }
};
