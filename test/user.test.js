const repository = require('../app/services/databases/user');
const usersFactory = require('./factory/user');

describe('Testing Endpoint User /POST', () => {
  describe('', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      await usersFactory.create();
    });
    afterEach(async () => {
      await usersFactory.cleanUp();
    });
    test('User creation succesy', async () => {
      const userToTest = {
        first_name: 'Tom',
        last_name: 'Lee',
        email: 'Tom.Lee@wolox.com',
        password: '12345rE8'
      };
      const result = await repository.store(userToTest);
      expect(result).toBeInstanceOf(Object);
    });

    test('User creation fail wrong E-mail', async () => {
      const userToTest = {
        first_name: 'Tom',
        last_name: 'Lee',
        email: 'Tom.Lee@wolox.com',
        password: '12345rE8'
      };
      const result = await repository.store(userToTest);
      expect(result[1]).toBe(false);
    });
  });
});
