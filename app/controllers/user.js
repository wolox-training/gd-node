const { createToken } = require('../services/databases/internals/getToken');
const repository = require('../services/databases/user');
const logger = require('../logger');

const signUp = async (req, res) => {
  try {
    const result = await repository.store(req.body);
    if (result[1]) {
      logger.info('User created Successfully');
      return res.status(200).json({ message: 'User created Successfully', email: result[0] });
    }
    logger.error({ message: 'Email already in use' });
    return res.status(400).json({ message: 'Email already in use' });
  } catch (error) {
    logger.error('Server Fail');
    return res.status(500).json({ message: 'Server Fail', errors: error });
  }
};

const signIn = async (req, res) => {
  try {
    const result = await repository.getOne(req.body);
    if (result) {
      const userToken = createToken(req.body);
      logger.info('User found');
      return res.status(200).json({ message: 'User found', email: result, token: userToken });
    }
    logger.error({ message: 'Wrong email or password' });
    return res.status(400).json({ message: 'Wrong email or password' });
  } catch (error) {
    logger.error('Server Fail');
    return res.status(500).json({ message: 'Server Fail', errors: error });
  }
};

module.exports = {
  signUp,
  signIn
};
