const bcrypt = require('bcryptjs');
const { factory } = require('factory-girl');
const { User } = require('../../app/models');

factory.define('user', User, {
  first_name: 'Tom',
  last_name: 'Lee',
  email: 'Tom.Lee@wolox.com',
  password: bcrypt.hashSync('12345rt8', 10),
  roleId: 'standard'
});

module.exports = {
  create: params => factory.create('user', params),
  createMany: (num = 5, params) => factory.createMany('user', num, params),
  build: params => factory.build('user', params),
  attributes: params => factory.attrs('user', params),
  cleanUp: params => factory.cleanUp('user', params)
};
