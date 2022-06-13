const { job } = require('../app/services/externals/congratsEmail');

describe('Testing Cron Job', () => {
  describe('Create cron job', () => {
    beforeEach(async () => {
      await jest.clearAllMocks();
    });

    test('Create cron job successfully', () => {
      const spy = jest.spyOn(job, 'start');
      job.start();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
