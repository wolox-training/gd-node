const { successfulMesages, errorsMessages } = require('../services/internals/constants');
const repository = require('../services/databases/qualification');
const userRepository = require('../services/databases/user');
const weetRepository = require('../services/databases/weet');

const logger = require('../logger');

const createQualifyWeet = async (req, res) => {
  try {
    const weetScore = req.body.score;
    const findUser = await userRepository.getOne(req.decoded);
    const findWeet = await weetRepository.getOne(req.params.id);
    if (findUser === null || findWeet === null) {
      logger.info(errorsMessages.FAIL);
      return res.status(404).json({ message: errorsMessages.WRONG });
    }
    const result = await repository.store({ findUser, findWeet, weetScore });
    logger.info(successfulMesages.CREATED);
    return res.status(200).json({ weets: result });
  } catch (error) {
    logger.error(errorsMessages.FAIL);
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

module.exports = {
  createQualifyWeet
};
