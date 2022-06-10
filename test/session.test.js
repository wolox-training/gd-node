const request = require('supertest');
const app = require('../app');
const { userToTest } = require('../app/services/internals/fakeData');
const usersFactory = require('./factory/user');
const sessionFactory = require('./factory/session');

describe('Testing Endpoint Session', () => {
  describe('Create Session', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
    });

    test('Session destroy successfully', async () => {
      await usersFactory.create(userToTest);
      await sessionFactory.create();
      await request(app)
        .post('/users/sessions/invalidate_all')
        .then(response => {
          console.log(response);
          expect(response.statusCode).toBe(200);
          // expect(response.body.position).toEqual('developer');
        });
    });
  });
});
