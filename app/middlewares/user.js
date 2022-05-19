const { checkSchema, validationResult } = require('express-validator');

async function validateSignUp(req, res, next) {
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
      notEmpty: {
        negated: false,
        errorMessage: 'Cannot be empty field'
      },
      customSanitizer: {
        options: value => {
          const withDomain = value.split('@');
          if (withDomain[1] === undefined) {
            return 'Invalid email format';
          } else if (withDomain[1] !== 'wolox.com') {
            return 'Email not belongs to WOLOX';
          }
          return value;
        }
      },
      isEmail: true
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
  return next();
}

async function validateSignIn(req, res, next) {
  await checkSchema({
    email: {
      notEmpty: {
        negated: false,
        errorMessage: 'Cannot be empty field'
      },
      customSanitizer: {
        options: value => {
          const withDomain = value.split('@');
          if (withDomain[1] === undefined) {
            return 'Invalid email format';
          } else if (withDomain[1] !== 'wolox.com') {
            return 'Email not belongs to WOLOX';
          }
          return value;
        }
      },
      isEmail: true
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
  return next();
}

module.exports = {
  validateSignUp,
  validateSignIn
};
