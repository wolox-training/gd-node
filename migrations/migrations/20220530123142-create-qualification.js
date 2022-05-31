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
        // eslint-disable-next-line new-cap
        type: Sequelize.ARRAY(Sequelize.STRING)
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('qualifications');
  }
};
