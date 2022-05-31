const request = require('supertest');
const app = require('../app');
const { userToTest, tokenUserToTest } = require('../app/services/internals/fakeData');
const usersFactory = require('./factory/user');
const weetsFactoy = require('./factory/weet');

describe('Testing Endpoint Weet', () => {
  describe('Create Weet', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
    });
    test('Weet create successfully', async () => {
      await usersFactory.create(userToTest);
      await request(app)
        .post('/weets')
        .set(tokenUserToTest)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toEqual('Created Successfully');
        });
    });
    test('Weet create fail without token', async () => {
      await usersFactory.create(userToTest);
      await request(app)
        .post('/weets')
        .then(response => {
          expect(response.statusCode).toBe(400);
          expect(response.error.text).toEqual('"Token was not supplied"');
        });
    });
  });
  describe('List Weet', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
    });
    test('Weet list successfully', async () => {
      await usersFactory.create(userToTest);
      await weetsFactoy.create();
      await request(app)
        .get('/weets')
        .set(tokenUserToTest)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.weets).toBeInstanceOf(Array);
        });
    });
    test('Weet list fail without token', async () => {
      await usersFactory.create(userToTest);
      await weetsFactoy.create();
      await request(app)
        .get('/weets')
        .then(response => {
          expect(response.statusCode).toBe(400);
          expect(response.error.text).toEqual('"Token was not supplied"');
        });
    });
  });
});
