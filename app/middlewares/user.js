const { errorsMessages } = require('../services/internals/constants')
const { checkSchema, validationResult } = require('express-validator');

async function validateSignUp(req, res, next) {
  await checkSchema({
    first_name: {
      notEmpty: true,
      errorMessage: errorsMessages.EMPTY
    },
    last_name: {
      notEmpty: true,
      errorMessage: errorsMessages.EMPTY
    },
    email: {
      notEmpty: {
        negated: false,
        errorMessage: errorsMessages.EMPTY
      },
      customSanitizer: {
        options: value => {
          const withDomain = value.split('@');
          if (withDomain[1] === undefined) {
            return errorsMessages.INVALID_EMAIL;
          } else if (withDomain[1] !== 'wolox.com') {
            return errorsMessages.INVALID_DOMAIN;
          }
          return value;
        }
      },
      isEmail: true
    },
    password: {
      isLength: {
        errorMessage: errorsMessages.PASSWORD_LONG,
        options: {
          min: 8
        }
      },
      isAlphanumeric: true,
      errorMessage: errorsMessages.PASSWORD_ALPHA
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
        errorMessage: errorsMessages.EMPTY
      },
      customSanitizer: {
        options: value => {
          const withDomain = value.split('@');
          if (withDomain[1] === undefined) {
            return errorsMessages.INVALID_EMAIL;
          } else if (withDomain[1] !== 'wolox.com') {
            return errorsMessages.INVALID_DOMAIN;
          }
          return value;
        }
      },
      isEmail: true
    },
    password: {
      isLength: {
        errorMessage: errorsMessages.PASSWORD_LONG,
        options: {
          min: 8
        }
      },
      isAlphanumeric: true,
      errorMessage: errorsMessages.PASSWORD_ALPHA
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
        errorMessage: errorsMessages.EMPTY
      },
      customSanitizer: {
        options: value => {
          const withDomain = value.split('@');
          if (withDomain[1] === undefined) {
            return errorsMessages.INVALID_EMAIL;
          } else if (withDomain[1] !== 'wolox.com') {
            return errorsMessages.INVALID_DOMAIN;
          }
          return value;
        }
      },
      isEmail: true
    },
    password: {
      isLength: {
        errorMessage: errorsMessages.PASSWORD_LONG,
        options: {
          min: 8
        }
      },
      isAlphanumeric: true,
      errorMessage: errorsMessages.PASSWORD_ALPHA
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
