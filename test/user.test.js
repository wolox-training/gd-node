const repository = require('../app/services/databases/user');
const usersFactory = require('./factory/user');

describe('Testing Endpoint User /POST', () => {
  describe('', () => {
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
});
