const request = require('supertest');
const app = require('../app');
const { adminToTest, userToTest, tokenUserToTest } = require('../app/services/internals/fakeData');
const usersFactory = require('./factory/user');

describe('Testing Endpoint Weet', () => {
  describe('Create Weet', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
    });
    test('Weet create successfully', async () => {
      await usersFactory.create(adminToTest);
      await usersFactory.create(userToTest);
      await request(app)
        .post('/weets')
        .set(tokenUserToTest)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toEqual('created Successfully');
        });
    });
    test('Weet create fail without token', async () => {
      await usersFactory.create(adminToTest);
      await usersFactory.create(userToTest);
      await request(app)
        .post('/weets')
        .then(response => {
          expect(response.statusCode).toBe(400);
          expect(response.body).toEqual('Token was not supplied');
        });
    });
  });
});
