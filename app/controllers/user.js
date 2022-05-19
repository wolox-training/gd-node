const repository = require('../services/databases/user');
const logger = require('../logger');

const sign_up = async (req, res) => {
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

const sign_in = async (req, res) => {
  try {
    const result = await repository.getOne(req.body);
    if (result) {
      logger.info('User found');
      return res.status(200).json({ Message: 'User found', Data: result });
    }
    logger.error('User not found');
    return res.status(400).json('User not found');
  } catch (error) {
    logger.error('Server Fail');
    return res.status(500).json({ Message: 'Server Fail', Errors: error });
  }
};

module.exports = {
  sign_up,
  sign_in
};
