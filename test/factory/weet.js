const { factory } = require('factory-girl');
const { Weet } = require('../../app/models');

factory.define('weet', Weet, {
  content:
    'Chuck Norris protocol design method has no status, requests or responses, only commands. and other things',
  user_id: '1'
});

module.exports = {
  create: params => factory.create('weet', params),
  createMany: (num = 5, params) => factory.createMany('weet', num, params),
  build: params => factory.build('weet', params),
  attributes: params => factory.attrs('weet', params),
  cleanUp: params => factory.cleanUp('weet', params)
};
