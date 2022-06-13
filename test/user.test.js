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
          'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imw1UE83RzM0bWdaS1p5QXFzeDJLRiJ9.eyJpc3MiOiJodHRwczovL2Rldi1hempnOC1meC51cy5hdXRoMC5jb20vIiwic3ViIjoiMlExeko4ZnoxNUxkM3hNSEhVeG5ldkVoNHVqQTFRdGlAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWF6amc4LWZ4LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU1MTQxODk0LCJleHAiOjE2NTUyMjgyOTQsImF6cCI6IjJRMXpKOGZ6MTVMZDN4TUhIVXhuZXZFaDR1akExUXRpIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.xfPwL9XPJla_N9DhmwTiUcxbhZbhgvqn3QB0Copk0kTbnpai5QyVg0IYM6KBCddYNe8IY-HEJCWdcKNReMxjtzEVj1_AY_empIUrCMhWrPH5FDfrPNi64r8Wx7Fuw8_M-P4bVLqcG8kQ_n9y3JbDQ0VoRX45dnY4NddZlJvbzD1zL5x_bJdrDiNEfXcJQz_bRgzV9DYXy4iLSK-sFkG13zH8I9mfTRScERMLLxxEw3utbfM6JS19tjx6qnD6tVLI6hiLIeQ9rUZn6K4p6sH_dm7ZaV8ZD8GFsQ-mncgKqpCllnMMe_0j7grSdUBuB7M9lYqArXij9f-K1SrHbYXdwA'
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
      await request(app)
        .get('/users')
        .then(response => {
          expect(response.statusCode).toBe(500);
          expect(response.error.message).toEqual('cannot GET /users (500)');
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
