const bcrypt = require('bcryptjs');
const logger = require('../../app/logger');
const { validationResult } = require('express-validator');
const { User } = require('../models');

exports.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    }
  })
    .then(([user, created]) => {
      if (created) {
        logger.info('User created Successfully');
        return res.status(200).json({ Message: 'User created Successfully', Data: user.email });
      }
      logger.error('Email already in use');
      return res.status(400).json('Email already in use');
    })
    .catch(err => {
      logger.error('Server Fail');
      res.status(500).json({ Message: 'Server Fail', Errors: err });
    });
};
