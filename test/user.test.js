const request = require('supertest');
const app = require('../app');
const repository = require('../app/services/databases/user');
const usersFactory = require('./factory/user');

describe('Testing Endpoint User', () => {
  describe('signUp', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
    });
    afterEach(async () => {
      await usersFactory.cleanUp();
    });
    test('User creation successfully', async () => {
      const userToTest = {
        first_name: 'Tom',
        last_name: 'Lee',
        email: 'Tom.Lee@wolox.com',
        password: '12345rE8'
      };
      const result = await repository.store(userToTest);
      expect(result).toBeInstanceOf(Object);
      expect(result[1]).toBe(true);
    });
    test('User creation fail mail in use', async () => {
      const userToTest = {
        first_name: 'Tom',
        last_name: 'Lee',
        email: 'Tom.Lee@wolox.com',
        password: '12345rE8'
      };
      await usersFactory.create();
      const result = await repository.store(userToTest);
      expect(result[1]).toBe(false);
    });
    test('User creation fail wrong password', async () => {
      const userToTest = {
        first_name: 'Tom',
        last_name: 'Lee',
        email: 'Tom.Lee@wolox.com',
        password: '12345'
      };
      await usersFactory.create();
      const result = await repository.store(userToTest);
      expect(result[1]).toBe(false);
    });
    test('User creation fail without parameter', async () => {
      const userToTest = {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      };
      await usersFactory.create();
      const result = await repository.store(userToTest);
      expect(result.errors).toBeInstanceOf(Array);
    });
  });
  describe('signIn', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
      await usersFactory.create();
    });
    afterEach(async () => {
      await usersFactory.cleanUp();
    });
    test('User login successfully', async () => {
      const userToTest = {
        email: 'Tom.Lee@wolox.com',
        password: '12345rt8'
      };
      await request(app)
        .post('/users/sessions')
        .send(userToTest)
        .then(response => {
          expect(response.body.email).toEqual('Tom.Lee@wolox.com');
          expect(response.statusCode).toBe(200);
        });
    });
    test('User login fail wrong password', async () => {
      await jest.setTimeout(30000);
      const userToTest = {
        email: 'Tom.Lee@wolox.com',
        password: '12345rt89'
      };
      await request(app)
        .post('/users/sessions')
        .send(userToTest)
        .then(response => {
          expect(response.error.text).toEqual('{"message":"Wrong email or password"}');
          expect(response.statusCode).toBe(400);
        });
    });
    test('User login fail wrong email', async () => {
      const userToTest = {
        email: 'Tom.Lee.13@wolox.com',
        password: '12345rt8'
      };
      await request(app)
        .post('/users/sessions')
        .send(userToTest)
        .then(response => {
          expect(response.error.text).toEqual('{"message":"Wrong email or password"}');
          expect(response.statusCode).toBe(400);
        });
    });
  });
  describe('listAll', () => {
    test('list all user successfully', async () => {
      await jest.setTimeout(30000);
      const tokenToTest = {
        authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImpvaG4uZG93LjEzQHdvbG94LmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2NzgifQ.VI2EM4wQN6VV76872ralb1cchHEsrRAdVcG2YHn__KI'
      };
      await request(app)
        .get('/users')
        .set(tokenToTest)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.text).toEqual('{"users":[]}');
        });
    });
    test('list all user fail without token', async () => {
      await jest.setTimeout(30000);
      const tokenToTest = {
        authorization: ''
      };
      await request(app)
        .get('/users')
        .set(tokenToTest)
        .then(response => {
          expect(response.statusCode).toBe(400);
          expect(response.text).toEqual('"token was not supplied"');
        });
    });
  });
});
