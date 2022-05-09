'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
      },
      first_name: { 
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: { 
          type: Sequelize.STRING,
          allowNull: false
      },
      email: { 
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      password:{ 
          type: Sequelize.STRING,
          allowNull: false
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
