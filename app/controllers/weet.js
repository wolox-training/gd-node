const { successfulMesages, errorsMessages } = require('../services/internals/constants');
const repository = require('../services/databases/weet');
const logger = require('../logger');

const createWeet = async (req, res) => {
  try {
    const result = await repository.store(req);
    if (result) {
      logger.info(successfulMesages.CREATED);
      return res.status(200).json({ message: successfulMesages.CREATED, weet: result });
    }
    logger.error({ message: errorsMessages.NOT_CREATED });
    return res.status(400).json({ message: errorsMessages.NOT_CREATED });
  } catch (error) {
    logger.error(errorsMessages.FAIL);
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

const listAllWeets = async (req, res) => {
  try {
    const { offset = 1, limit = 3 } = req.query;
    const result = await repository.getAll({ offset, limit });
    logger.info(successfulMesages.LIST_ALL);
    return res.status(200).json({ weets: result });
  } catch (error) {
    logger.error(errorsMessages.FAIL);
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

module.exports = {
  createWeet,
  listAllWeets
};
