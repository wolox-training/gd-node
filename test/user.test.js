const request = require('supertest');
const app = require('../app');
const repository = require('../app/services/databases/user');
const {
  userSignUpTest,
  userSignUpTestEmpty,
  userSignInTest,
  userSignUpAdminTest
} = require('../app/services/internals/fakeData');
const usersFactory = require('./factory/user');

describe('Testing Endpoint User', () => {
  describe('signUp', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
    });

    test('User creation successfully', async () => {
      const result = await repository.store(userSignUpTest);
      expect(result).toBeInstanceOf(Object);
      expect(result[1]).toBe(true);
    });
    test('User creation fail mail in use', async () => {
      await usersFactory.create();
      const result = await repository.store(userSignUpTest);
      expect(result[1]).toBe(false);
    });
    test('User creation fail wrong password', async () => {
      await usersFactory.create();
      const result = await repository.store(userSignUpTest);
      expect(result[1]).toBe(false);
    });
    test('User creation fail without parameter', async () => {
      await usersFactory.create();
      const result = await repository.store(userSignUpTestEmpty);
      expect(result.errors).toBeInstanceOf(Array);
    });
  });
  describe('signIn', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
      await usersFactory.create();
    });

    test('User login successfully', async () => {
      await jest.setTimeout(30000);
      await request(app)
        .post('/users/sessions')
        .send(userSignInTest)
        .then(response => {
          expect(response.body.email).toEqual('tom.lee@wolox.com');
          expect(response.statusCode).toBe(200);
        });
    });
    test('User login fail wrong password', async () => {
      const userToTest = {
        email: 'tom.lee@wolox.com',
        password: '123456789'
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
        email: 'tom.lee.13@wolox.com',
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
      const tokenToTest = {
        authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdF9uYW1lIjoiam9obiIsImxhc3RfbmFtZSI6ImRvdyAxMSIsImVtYWlsIjoiam9obi5kb3cuMTFAd29sb3guY29tIiwicm9sZV9pZCI6InN0YW5kYXJkIn0.5r0QEHhq8G0E2_RTqWoAdrtPcaw3jWYxSokvWGVSxa8'
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
      const tokenToTest = {
        authorization: ''
      };
      await request(app)
        .get('/users')
        .set(tokenToTest)
        .then(response => {
          expect(response.statusCode).toBe(400);
          expect(response.text).toEqual('"Token was not supplied"');
        });
    });
  });
  describe('signUpAdmin', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
    });
    test('Create user Admin successfully', async () => {
      const tokenToTest = {
        authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdF9uYW1lIjoiam9obiIsImxhc3RfbmFtZSI6ImRvdyAxIiwiZW1haWwiOiJqb2huLmRvdy4xQHdvbG94LmNvbSIsInJvbGVfaWQiOiJhZG1pbmlzdHJhdG9yIn0.Grs6gZlLt9MdgaRfTKVyZlcHtlqsS9FSfIFKq6kt1Ao'
      };
      await request(app)
        .post('/admin/users')
        .set(tokenToTest)
        .send(userSignUpAdminTest)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toEqual('Created Successfully');
        });
    });
    test('Update user Admin successfully', async () => {
      await usersFactory.create();
      const tokenToTest = {
        authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsImVtYWlsIjoiRG9lIiwicm9sZV9pZCI6ImFkbWluaXN0cmF0b3IifQ.1WkiDFZrXUvJ4nvtafFHcscjq7YeZIxnywSXCoIonQk'
      };
      const userToTest = {
        first_name: 'tom',
        last_name: 'lee',
        email: 'tom.lee@wolox.com',
        password: '12345678'
      };
      await request(app)
        .post('/admin/users')
        .set(tokenToTest)
        .send(userToTest)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toEqual('Updated Successfully');
        });
    });
    test('Create user Admin Fail', async () => {
      await jest.setTimeout(30000);
      const tokenToTest = { authorization: '' };
      await request(app)
        .post('/admin/users')
        .set(tokenToTest)
        .send(userSignUpAdminTest)
        .then(response => {
          expect(response.statusCode).toBe(400);
          expect(response.error.text).toEqual('"Token was not supplied"');
        });
    });
  });
});
