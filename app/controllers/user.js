const { createToken } = require('../services/databases/internals/getToken');
const repository = require('../services/databases/user');
const logger = require('../logger');

const signUp = async (req, res) => {
  try {
    const result = await repository.store(req.body);
    if (result[1]) {
      logger.info('User created Successfully');
      return res.status(200).json({ Message: 'User created Successfully', Data: result[0] });
    }
    logger.error('Email already in use');
    return res.status(400).json('Email already in use');
  } catch (error) {
    logger.error('Server Fail');
    return res.status(500).json({ Message: 'Server Fail', Errors: error });
  }
};

const signIn = async (req, res) => {
  try {
    const result = await repository.getOne(req.body);
    if (result) {
      const userToken = createToken(req.body);
      logger.info('User found');
      return res.status(200).json({ Message: 'User found', Data: result, token: userToken });
    }
    logger.error('Wrong email or password');
    return res.status(400).json('Wrong email or password');
  } catch (error) {
    logger.error('Server Fail');
    return res.status(500).json({ Message: 'Server Fail', Errors: error });
  }
};

module.exports = {
  signUp,
  signIn
};
