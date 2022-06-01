'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'john',
          last_name: 'dow',
          email: 'john.dow@wolox.com',
          password: bcrypt.hashSync('12345678', 10),
          role_id: 'administrator',
          position: 'developer'
        },
        {
          first_name: 'tom',
          last_name: 'lee',
          email: 'tom.lee@wolox.com',
          password: bcrypt.hashSync('12345678', 10),
          role_id: 'standard',
          position: 'lead'
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
