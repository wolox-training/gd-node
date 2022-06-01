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
        values: ['1', '-1']
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.sequelize.transaction(() => 
      Promise.all([
        queryInterface.dropTable('qualifications'),
        queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_qualifications_score";')
      ])
    )
  }
};
