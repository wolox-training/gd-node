const { successfulMesages, errorsMessages } = require('../services/internals/constants');
const { createToken } = require('../services/internals/getToken');
const repository = require('../services/databases/user');
const logger = require('../logger');

const signUp = async (req, res) => {
  try {
    const result = await repository.store(req.body);
    if (result[1]) {
      logger.info(successfulMesages.CREATED);
      return res.status(200).json({ message: successfulMesages.CREATED, email: result[0] });
    }
    logger.error({ message: errorsMessages.EMAIL_DUPLICATE });
    return res.status(400).json({ message: errorsMessages.EMAIL_DUPLICATE });
  } catch (error) {
    logger.error(errorsMessages.FAIL);
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

const signIn = async (req, res) => {
  try {
    const result = await repository.getOne(req.body);
    if (result) {
      const userToken = createToken(req.body);
      logger.info(successfulMesages.FOUNDED);
      return res.status(200).json({ message: successfulMesages.FOUNDED, email: result, token: userToken });
    }
    logger.error({ message: errorsMessages.WRONG_PARAMS });
    return res.status(400).json({ message: errorsMessages.WRONG_PARAMS});
  } catch (error) {
    logger.error('Server Fail');
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

module.exports = {
  signUp,
  signIn
};
