const { factory } = require('factory-girl');
const { Qualification } = require('../../app/models');

factory.define('qualification', Qualification, {
  rating_user_id: 1,
  weet_id: 1,
  score: 1
});

module.exports = {
  create: params => factory.create('qualification', params),
  createMany: (num = 5, params) => factory.createMany('qualification', num, params),
  build: params => factory.build('qualification', params),
  attributes: params => factory.attrs('qualification', params),
  cleanUp: params => factory.cleanUp('qualification', params)
};
