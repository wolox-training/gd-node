const { welcomeEmailUser } = require('../app/services/externals/welcomeEmail');

describe('Testing Send Email', () => {
  describe('Create Welcom Email', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
    });

    test('Welcome email create successfully', async () => {
      await jest.setTimeout(60000);
      const userParams = {
        from: 'Welcom New Joiners <welcomNewJoiners@wolox.com>',
        to: 'john.tow@wolox.com',
        subject: 'Welcom to Wolox ✔',
        text: 'Welcom New Joiners',
        html: '<b>Welcom New Joiner</b>'
      };
      const data = await welcomeEmailUser(userParams);
      expect(data).toBeInstanceOf(Object);
      expect(data.envelope).toStrictEqual({ from: 'welcomNewJoiners@wolox.com', to: ['john.tow@wolox.com'] });
    });
    test('Welcome email create fail', async () => {
      await jest.setTimeout(30000);
      const paramsToTest = {
        email: ''
      };
      const data = await welcomeEmailUser(paramsToTest);
      expect(data.message).toBe('No recipients defined');
    });
  });
});
