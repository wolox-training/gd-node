const bcrypt = require('bcryptjs');
const { factory } = require('factory-girl');
const { User } = require('../../app/models');

factory.define('user', User, {
  first_name: 'tom',
  last_name: 'lee',
  email: 'tom.lee@wolox.com',
  password: bcrypt.hashSync('12345rt8', 10),
  role_id: 'standard'
});

module.exports = {
  create: params => factory.create('user', params),
  createMany: (num = 5, params) => factory.createMany('user', num, params),
  build: params => factory.build('user', params),
  attributes: params => factory.attrs('user', params),
  cleanUp: params => factory.cleanUp('user', params)
};
