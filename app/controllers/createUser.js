const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { User } = require('../models');

console.log(User, '9999');

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    console.log('100');
    console.log(req.body, 'body');
    const [user, created] = await User.findOrCreate({
      where: {
        email: req.body.email
      },
      default: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      }
    });
    if (created === 'true') {
      console.log('200', created);
      return res.status(200).json('User created Successfully', user);
    }
    console.log('300');
    return res.status(400).json('Email already in use');
  } catch (error) {
    console.log('400');
    return res.status(500).json(error);
  }
};
