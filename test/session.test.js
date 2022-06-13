const request = require('supertest');
const app = require('../app');
const { userToTest, sessionToTest } = require('../app/services/internals/fakeData');
const usersFactory = require('./factory/user');
const sessionsFactory = require('./factory/session');

describe('Testing Endpoint Session', () => {
  describe('Create Session', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
    });

    test('Session destroy successfully', async () => {
      await usersFactory.create(userToTest);
      await sessionsFactory.create();
      await request(app)
        .post('/users/sessions/invalidate_all')
        .set(sessionToTest)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toEqual('Destroy Successfully');
        });
    });
    test('Session destroy fail without token', async () => {
      await usersFactory.create(userToTest);
      await sessionsFactory.create();
      await request(app)
        .post('/users/sessions/invalidate_all')
        .then(response => {
          expect(response.statusCode).toBe(400);
          expect(response.error.text).toEqual('"Token was not supplied"');
        });
    });
  });
});
