const app = require('./app');
const migrationsManager = require('./migrations');
const config = require('./config');
const logger = require('./app/logger');
const { job } = require('./app/services/externals/congratsEmail');

const port = config.common.api.port || 8080;

Promise.resolve()
  .then(() => migrationsManager.check())
  .then(() => {
    app.listen(port);

    job.start();
    logger.info(`Listening on port: ${port}`);
  })
  .catch(logger.error);
