const request = require('supertest');
const app = require('../app');
const { userToTest, tokenUserToTest } = require('../app/services/internals/fakeData');
const usersFactory = require('./factory/user');
const weetsFactoy = require('./factory/weet');
const qualificationFactory = require('./factory/qualifications');

describe('Testing Endpoint Qualification', () => {
  describe('Create Qualification', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
    });

    test('Qualification create successfully', async () => {
      const scoreToTest = {
        score: 1
      };
      await usersFactory.create(userToTest);
      await weetsFactoy.create();
      await qualificationFactory.create();
      await request(app)
        .post('/weets/1/ratings')
        .send(scoreToTest)
        .set(tokenUserToTest)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.position).toEqual('developer');
        });
    });
    test('Qualification create fail without score', async () => {
      const scoreToTest = {
        score: ''
      };
      await usersFactory.create(userToTest);
      await weetsFactoy.create();
      await qualificationFactory.create();
      await request(app)
        .post('/weets/1/ratings')
        .send(scoreToTest)
        .set(tokenUserToTest)
        .then(response => {
          expect(response.statusCode).toBe(400);
          expect(response.error.text).toEqual(
            '{"errors":[{"value":"","msg":"Cannot be empty","param":"score","location":"body"},{"value":"","msg":"Invalid score","param":"score","location":"body"}]}'
          );
        });
    });
  });
});
