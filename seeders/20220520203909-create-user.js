'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'User',
      [
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'John.Doe@wolox.com',
          password: bcrypt.hashSync('12345678', 10),
          role_id: 'administrator'
        },
        {
          first_name: 'Tom',
          last_name: 'Lee',
          email: 'Tom.Lee@wolox.com',
          password: bcrypt.hashSync('12345678', 10),
          role_id: 'regular'
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('User', null, {});
  }
};
