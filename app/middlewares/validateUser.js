const { check, body } = require('express-validator');

module.exports = [
  body('email')
    .isEmail()
    .withMessage('Email not Valid'),
  body('email').custom(value => {
    const splitted = value.split('@');
    if (splitted[1] !== 'wolox.com') {
      throw new Error('Email not belongs to Domain WOLOX');
    }
    return true;
  }),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long')
];
