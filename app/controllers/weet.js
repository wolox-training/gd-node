const { successfulMesages, errorsMessages } = require('../services/internals/constants');
const repository = require('../services/databases/weet');
const logger = require('../logger');

const createWeet = async (req, res) => {
  try {
    const result = await repository.store(req.body);
    if (result) {
      logger.info(successfulMesages.CREATED);
      return res.status(200).json({ message: successfulMesages.CREATED, weet: result });
    }
    logger.error({ message: errorsMessages.FAIL });
    return res.status(400).json({ message: errorsMessages.FAIL });
  } catch (error) {
    logger.error(errorsMessages.FAIL);
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

module.exports = {
  createWeet
};
