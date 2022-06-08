// eslint-disable-next-line prefer-destructuring
const CronJob = require('cron').CronJob;
const logger = require('../../logger');
const { welcomeEmailUser } = require('./welcomeEmail');
const repository = require('../databases/user');

const job = new CronJob(
  '00 00 18 * * 0-6',
  async () => {
    logger.info('Before job instantiation');
    logger.info('Run at 18PM Every Day');
    const result = await repository.getAll({ offset: 0, limit: 5 });
    const userParams = {
      from: 'Wolox Team <woloxteam@wolox.com>',
      to: result[1].email,
      subject: 'Congratulations to the best Weeter ✔',
      text: 'Congratulacions you are the best Weeter',
      html: '<b>Congratulacions you are the best Weeter</b>'
    };
    for (let i = 0; i < result.length; i++) {
      await welcomeEmailUser(userParams);
    }
    logger.info('After job instantiation');
  },
  null,
  true,
  'America/Buenos_Aires'
);

module.exports = {
  job
};
