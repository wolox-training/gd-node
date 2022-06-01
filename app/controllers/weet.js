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
    const offset = Number(req.query.offset) > 0 ? Number(req.query.offset) : 1;
    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 3;
    const result = await repository.getAll({ offset, limit });
    logger.info(successfulMesages.LISTED);
    return res.status(200).json({ weets: result });
  } catch (error) {
    logger.error(errorsMessages.FAIL);
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

const updateWeet = async (req, res) => {
  try {
    const rating = req.body.score;
    // const result = await repository.update(rating);
    // logger.info(successfulMesages.UPDATED);
    return res.status(200).json({ weets: rating });
  } catch (error) {
    logger.error(errorsMessages.FAIL);
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

module.exports = {
  createWeet,
  listAllWeets,
  updateWeet
};
