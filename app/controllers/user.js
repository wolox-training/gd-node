const { successfulMesages, errorsMessages } = require('../services/internals/constants');
const { createToken } = require('../services/internals/getToken');
const repository = require('../services/databases/user');
const logger = require('../logger');

const signUp = async (req, res) => {
  try {
    const result = await repository.store(req.body);
    if (result[1]) {
      logger.info(successfulMesages.CREATED);
      return res.status(200).json({ message: successfulMesages.CREATED, email: result[0].email });
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
      const userToken = createToken({
        id: result.id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        role_id: result.role_id
      });
      logger.info(successfulMesages.FOUNDED);
      return res.status(200).json({ message: successfulMesages.FOUNDED, email: result, token: userToken });
    }
    logger.error({ message: errorsMessages.WRONG_PARAMS });
    return res.status(400).json({ message: errorsMessages.WRONG_PARAMS });
  } catch (error) {
    logger.error(errorsMessages.FAIL);
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

const listAllUsers = async (req, res) => {
  try {
    const offset = Number(req.query.offset) > 0 ? Number(req.query.offset) : 1;
    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 3;
    const result = await repository.getAll({ offset, limit });
    logger.info(successfulMesages.LIST_ALL);
    return res.status(200).json({ users: result });
  } catch (error) {
    logger.error(errorsMessages.FAIL);
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

const signUpOrUpdateAdmin = async (req, res) => {
  try {
    req.body.role_id = 'administrator';
    const result = await repository.store(req.body);
    if (result[1]) {
      logger.info(successfulMesages.CREATED);
      return res.status(200).json({ message: successfulMesages.CREATED, email: result[0] });
    }
    const userToUpdate = await repository.update(req.body);
    return res.status(200).json({ message: successfulMesages.UPDATED, email: userToUpdate[1] });
  } catch (error) {
    logger.error(errorsMessages.FAIL);
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

module.exports = {
  signUp,
  signIn,
  listAllUsers,
  signUpOrUpdateAdmin
};
