const { factory } = require('factory-girl');
const { Session } = require('../../app/models');

factory.define('session', Session, {
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6InRvbSIsImxhc3RfbmFtZSI6ImxlZSIsImVtYWlsIjoidG9tLmxlZUB3b2xveC5jb20iLCJyb2xlX2lkIjoic3RhbmRhcmQiLCJpYXQiOjE2NTQ4ODQxMzUsImV4cCI6MTY1NDg4NDE5NX0.JpTaW6KLR6Yha7FwXTh1C47girIepO1JR_zYdirYW_g',
  token_user_id: 1,
  created_at: '2022-06-10 15:35:48.534-03',
  updated_at: '2022-06-10 15:35:48.534-03'
});

module.exports = {
  create: params => factory.create('session', params),
  createMany: (num = 5, params) => factory.createMany('session', num, params),
  build: params => factory.build('session', params),
  attributes: params => factory.attrs('session', params),
  cleanUp: params => factory.cleanUp('session', params)
};
