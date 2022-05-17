const { body } = require('express-validator');

module.exports = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long'),
  body('email')
    .isEmail()
    .withMessage('Wrong Email format'),
  body('email').custom(value => {
    const splitted = value.split('@');
    if (splitted[1] !== 'wolox.com') {
      throw new Error('Email not belongs to Domain WOLOX');
    }
    return true;
  })
];
