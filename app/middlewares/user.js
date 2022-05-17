const { validationResult } = require('express-validator');
const { checkSchema } = require('express-validator');

async function validateUser(req, res, next) {
  await checkSchema({
    first_name: {
      notEmpty: true,
      errorMessage: 'Cannot be empty field'
    },
    last_name: {
      notEmpty: true,
      errorMessage: 'Cannot be empty field'
    },
    email: {
      notEmpty: true,
      errorMessage: 'Cannot be empty field',
      isEmail: true,
      errorMessage: 'Email format invalid'
    },
    password: {
      isLength: {
        errorMessage: 'Password should be at least 8 chars long',
        options: {
          min: 8
        }
      },
      isAlphanumeric: true,
      errorMessage: 'Password should be Alphanumeric'
    }
  }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  validateUser
};
